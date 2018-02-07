const { Command } = require("../structures");

module.exports = class EchoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "echo",
      description: "repeats the specified text and deletes the original.",
      syntax: "echo <...MESSAGE>",
      admin: true,
      args: 1
    });
  }
  async run(msg, [...message]) {
    await msg.delete();
    return msg.channel.send(message.join(" "));
  }
};