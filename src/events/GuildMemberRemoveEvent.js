// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super("guildMemberRemove");
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
    let channelMessageOnLeave = new Discord.MessageEmbed()
      .setColor(Harrybot.randomHexColor)
      .setTitle(`${member.user.tag} left the server!`)
      .setThumbnail(`${member.user.displayAvatarURL()}`);
    channel.send(channelMessageOnLeave);
  }
};
