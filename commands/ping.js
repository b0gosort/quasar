const { Command } = require("../structures");
const { oneLine } = require("common-tags");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Checks the bot's ping to the Discord servers.",
      syntax: "ping"
    });
  }
  async run(msg) {
    const m = await msg.channel.send("Pinging...");
    return m.edit(oneLine`${msg.author}, your ping has been returned.
    Message latency: ${m.createdTimestamp - msg.createdTimestamp}ms, API latency: ${Math.round(this.client.ping)}ms.
    `);
  }
};