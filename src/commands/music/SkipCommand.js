const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super('skip', 'music', []);
  }

  run(client, message, args) {
    message.channel.send('skip command works');
  }
}