const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'general', [
      'ping',
      'uptime',
      'latency',
      'server',
      'api',
      'lag',
    ]);
  }

  async run(client, message, args) {
    var color = [
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
    var randomColor = color[Math.floor(Math.random() * color.length)];
    const pingEmbed = {
      color: randomColor,
      title: '〽️ Pinging...',
    };
    const m = await message.reply({ embed: pingEmbed });
    return m.edit({
      embed: {
        color: randomColor,
        title: `🏓`,
        fields: [
          {
            name: 'Server latency',
            value: `\`${m.createdTimestamp - message.createdTimestamp}ms\``,
          },
          {
            name: 'API latency:',
            value: `\`${Math.round(message.client.ws.ping)}ms\``,
          },
          {
            name: 'Uptime:',
            value: `\`${message.client.uptime / 1000} seconds\`.`,
          },
        ],
      },
    });
  }
};
