const { Command } = require("../structures");
const Package = require("../package.json");

module.exports = class VersionCommand extends Command {
  constructor(client) {
    super(client, {
      name: "version",
      description: "Shows the version Quasar is currently running on.",
      syntax: "version"
    });
  }
  run(msg) {
    return msg.channel.send(`Quasar is currently running on version ${Package.version}.`);
  }
};