// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const stats = require("./stats.json");
const BaseEvent = require("../utils/structures/BaseEvent");
const fs = require("fs");
let db = require("./database.json");
const { type, userInfo } = require("os");

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client, member) {
    if (member.guild.id !== stats.serverID) return;
    client.channels.cache
      .get(stats.total)
      .setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache
      .get(stats.member)
      .setName(
        `Members: ${member.guild.members.cache.filter((m) => !m.user.bot).size}`
      );
    client.channels.cache
      .get(stats.bots)
      .setName(
        `Bots: ${member.guild.members.cache.filter((m) => m.user.bot).size}`
      );

    const channel = member.guild.channels.cache.find(
      (channel) => channel.name === "joins"
    );
    if (!channel) return;
    if (member.guild.id === "738259551769460807") {
      let dmMessageOnJoin = new Discord.MessageEmbed()
        .setColor(Harrybot.randomHexColor)
        .setTitle(`Welcome, ${member.user.tag}`)
        .setDescription(
          "Please read the rules in [#rules](https://discord.com/channels/738259551769460807/742089240610996274), and maybe pick up some roles in [#roles](https://discord.com/channels/738259551769460807/755492029408084088)!"
        )
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .addFields({
          name: `You are the ${member.guild.memberCount} member!`,
        });
      member.send(dmMessageOnJoin);
      channel.send(dmMessageOnJoin);
    } else return;
  }
};
