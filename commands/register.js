const { Command } = require("../structures");
const config = require("../config.json");

module.exports = class RegisterCommand extends Command {
  constructor(client) {
    super(client, {
      name: "register",
      description: "register your nation",
      syntax: "register <...YOUR-NATION-NAME>",
      args: 1
    });
  }
  async run(msg, [...nation]) {
    nation = nation.match(/([^<>])/g)
      .join("")
      .split(" ")
      .join("_")
      .toLowerCase();
    try {
      const { NATION: data } = await this.client.request(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${nation}&q=wa+region+name`);
      if (data.REGION[0].split(" ").join("_").toLowerCase() !== config.region) {
        // For nations outside the region

        const foreignRole = msg.guild.roles.find("name", config.roles.foreign);

        await msg.member.addRole(foreignRole);
        for (const admin of Object.values(this.client.admins)) {
          this.client.users.get(admin)
            .send(`**${msg.author.username}** was assigned the role **${config.roles.foreign}** with the nation **${nation}**.`);
        }
        return msg.channel.send(`
You have been assigned the role **${config.roles.foreign}**. If you are here as a diplomat, please send a message to a government member.
        `);
      } else if (data.UNSTATUS[0] === "WA Member") {
        // For WA members in the region

        const citizenRole = msg.guild.roles.find("name", config.roles.citizen);

        await msg.member.addRole(citizenRole);
        for (const admin of Object.values(this.client.admins)) {
          this.client.users.get(admin)
            .send(`**${msg.author.username}** was assigned the role **${config.roles.foreign}** with the nation **${nation}**.`);
        }
        await msg.member.edit({ nick: data.NAME[0] });
        return msg.channel
          .send(`
You have been assigned the role **${config.roles.citizen}**. Please endorse the WA Delegate if you haven't already.
          `);
      } else {
        // For non-WA members in the region

        return msg.channel.send("Please join the World Assembly (https://nationstates.net/page=un) to gain citizenship and try again.");
      }
    } catch (err) {
      console.error("[DISCORD]", err);
      return msg.channel.send(`There was an error: ${err.message}`);
    }
  }
};