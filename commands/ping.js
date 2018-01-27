const { Command } = require("../src");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      descripton: "Checks the bot's ping to the Discord servers.",
      syntax: "ping"
    });
  }
  async run(msg) {
    const m = await msg.channel.send("Pinging...");
    return m.edit(`
${msg.author}, your ping has been returned. Message latency: ${m.createdTimestamp - msg.createdTimestamp}ms, API latency: ${this.client.ping}ms.
    `);
  }
};