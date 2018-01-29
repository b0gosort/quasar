const snekfetch = require("snekfetch");
const { Command } = require("../structures");
const Package = require("../package.json");

module.exports = class ShardCommand extends Command {
  constructor(client) {
    super(client, {
      name: "shard",
      description: "returns the specified shard info for the specified nation or region",
      syntax: "shard <TARGET TYPE> <SHARD> <TARGET NATION OR REGION>",
      args: 3
    });
  }
  async run(msg, [type, shard, ...target]) {
    target = target
      .join(" ")
      .split(" ")
      .join("_")
      .trim();
    try {
      const res = await snekfetch
        .get(`https://www.nationstates.net/cgi-bin/api.cgi?${type}=${target}&q=${shard}`,
          { headers: { "User-Agent": `Quasar v${Package.version} by Solborg (https://github.com/b0gosort/quasar/)` } });

      return msg.channel.send(res.body, { code: "xml" });
    } catch (err) {
      console.error("[DISCORD] Error:\n", err);
      return msg.channel.send(`There was an error with your request: ${err.message}`);
    }
  }
};