const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("test", "testing", ["tset", "idk"]);
  }

  async run(client, message, args) {
    message.reply("Test command works");
  }
};
