const BaseEvent = require("../../utils/structures/BaseEvent");
const youtube = require("./youtube");
const Discord = require("discord.js");
const guildId = require("../stats.json").serverID;

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client) {
    const db = require("quick.db");
    function handleUploads() {
      if (db.fetch(`postedVideos`) === null) db.set(`postedVideos`, []);
      setInterval(() => {
        new (require("rss-parser"))()
          .parseURL(
            `https://www.youtube.com/feeds/videos.xml?channel_id=${youtube.channel_id}`
          )
          .then((data) => {
            if (db.fetch(`postedVideos`).includes(data.items[0].link)) return;
            else {
              db.set(`videoData`, data.items[0]);
              db.push("postedVideos", data.items[0].link);
              let parsed = db.fetch(`videoData`);
              let channel = client.channels.cache.get(youtube.channel);
              if (!channel) return;
              let message = youtube.messageTemplate
                .replace(/{author}/g, parsed.author)
                .replace(/{title}/g, parsed.title)
                .replace(/{url}/g, parsed.link);
              channel.send(message);
            }
            Discord.Util.escapeMarkdown;
          });
      }, youtube.watchInterval);
    }
    console.log(client.user.tag + " has logged in.");
    client.user.setActivity(`--help in ${client.guilds.cache.size} server`, {
      type: "STREAMING",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });
    handleUploads();
    const getApp = client.api.applications(client.user.id).guilds(guildId);
    const commands = await client.api
      .applications(client.user.id)
      .guilds(require("../stats.json").serverID)
      .commands.get();

    await getApp.commands.post({
      data: {
        name: "help",
        description: "Help command",
        options: [
          {
            name: "Catagory",
            description: "Help on given catagory",
            required: false,
            type: 3,
          },
        ],
      },
    });

    client.ws.on("INTERACTION_CREATE", async (interaction) => {
      const { name, options } = interaction.data;
      const command = name.toLowerCase();
      const args = {};
      const reply = async (interaction, response) => {
        let data = {
          content: response,
        };
        if (typeof response === "object") {
          data = await createAPIMessage(interaction, response);
        }
        client.api
          .interactions(interaction.id, interaction.token)
          .callback.post({
            data: {
              type: 4,
              data,
            },
          });
      };
      const createAPIMessage = async (interaction, content) => {
        const { data, files } = await Discord.APIMessage.create(
          client.channels.resolve(interaction.channel_id),
          content
        )
          .resolveData()
          .resolveFiles();
        return { ...data, files };
      };

      if (options) {
        for (const option of options) {
          const { name, value } = option;
          args[name] = value;
        }
      }

      if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed().setTitle("Command Help");
        if (!args) {
          helpEmbed
            .addField(
              "General",
              "`/help catagory: general`\nOR\n`--help general`",
              true
            )
            .addField(
              "Moderation",
              "`/help catagory: moderation`\nOR\n`--help moderation`",
              true
            )
            .addField(
              "Music",
              "`/help catagory: music`\nOR\n`--help music`",
              true
            );
        }
        // for (const arg in args) {
        //   const value = args[arg];
        //   helpEmbed.addField(arg, value);
        // }
        reply(interaction, helpEmbed);
      }
    });
  }
};
