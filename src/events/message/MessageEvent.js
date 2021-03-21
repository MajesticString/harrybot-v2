const BaseEvent = require("../../utils/structures/BaseEvent");
const count = require("./count.json");
const fs = require("fs");
let db = require("../database.json");
const Discord = require("discord.js");
const { type, userInfo } = require("os");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client, message) {
    if (message.author.bot) return;
    if (
      message.mentions.users.first() &&
      message.mentions.users.first().id === "818619842067169341"
    ) {
      message.reply("My help command is `--help`");
    }
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      const args = message.content.trim().split(/ +/g);
      if (command) {
        command.run(client, message, cmdArgs, Discord, args);
        if (!args[1]) {
          console.log(args[0]);
        } else console.log(`${args[0]} ${args[1]}`);
      }
    }
  }
};
