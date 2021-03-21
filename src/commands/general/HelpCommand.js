const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const Harrybot = require('../../Harrybot');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'general', ['commands', 'commandhelp', 'h', 'ch']);
  }

  run(client, message, args, Discord) {
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const color = [
      0x00c09a,
      0x008369,
      0x00d166,
      0x008e44,
      0x0099e1,
      0x006798,
      0xa652bb,
      0x712f8f,
      0xfd0061,
      0xbc0057,
      0xf8c300,
      0xcc7900,
      0xf93a2f,
      0xa62019,
      0x91a6a6,
      0x969c9f,
      0x597e8d,
      0x4e6f7b,
    ];
    const randomColor = color[randomInt(0, color.length)];
    const catagories = [
      'general',
      'moderation',
      'leveling',
      'currency',
      'music',
    ];
    let helpEmbed = new Discord.MessageEmbed()
      .setTitle('Command Help')
      .setColor(randomColor)
      .setAuthor(
        'harry potter#0014',
        'https://cdn.discordapp.com/avatars/696554549418262548/2bb8a109ba41c84b0aad8d9f0bafb948.png'
      );
    if (!args[0] || catagories.includes(args[0]) == false) {
      helpEmbed.setDescription(
        'Use `--help (catagory)` to get commands within a catagory'
      );

      message.reply(helpEmbed);
    } else {
      helpEmbed = new Discord.MessageEmbed()
        .setTitle('Command Help')
        .setDescription(
          `${
            args[0].charAt(0).toUpperCase() + args[0].slice(1)
          } commands help.\nStart all commands with the prefix (${
            require('../../../slappey.json').prefix
          })`
        );
      if (args[0] === 'general') {
        helpEmbed.addField('`--help` OR ');
      }
      message.reply(helpEmbed);
    }
  }
};
