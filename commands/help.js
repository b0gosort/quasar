const { Command } = require("../structures");
const { prefix } = require("../config.json");

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Shows a list of commands",
      syntax: "help [COMMAND-NAME]"
    });
  }
  run(msg, [command]) {
    if (command) {
      const cmd = this.client.commands.get(command);
      if (!cmd) {
        return msg.reply(`the command ${command} does not exist.`);
      } else {
        const embed = {
          title: `Help for command ${command} ${cmd.admin ? "(admin-only)" : ""} ${cmd.guildOnly ? "(usable in servers only)" : ""}`,
          fields: [
            {
              name: "Description",
              value: cmd.description
            },
            {
              name: "Usage",
              value: cmd.syntax
            }
          ],
          color: 57082
        };
        return msg.channel.send({ embed });
      }
    } else {
      const messages = [];
      const help = `
**Command list for Quasar.**
_To see detailed info for a command, run \`${prefix}${this.syntax}\`_

${this.client.commands.map((comd) => `**${comd.name}** :: ${comd.description}`).join("\n")}
      `;
      messages.push([
        msg.author.send(help),
        msg.channel.send("I've sent you a DM with help.")
      ]);
      return Promise.all(messages).catch(() => msg.reply("I couldn't send you a DM with help. Please make sure you have DMs enabled."));
    }
  }
};