const { Command } = require("../structures");

module.exports = class ReloadCommand extends Command {
  constructor(client) {
    super(client, {
      name: "reload",
      description: "Reloads a command.",
      args: 1,
      syntax: "reload <COMMAND>",
      admin: true
    });
  }

  run(msg, [command]) {
    if (!this.client.commands.has(command)) return msg.reply("That command does not exist.");
    try {
      delete require.cache[require.resolve(`./${command}`)];
      this.client.commands.delete(command);
      const Command_ = require(`./${command}`);
      const cmd = new Command_(this.client);
      this.client.commands.set(cmd.name, cmd);
      return msg.reply(`the ${cmd.name} command has succesfully been reloaded.`);
    } catch (err) {
      return msg.reply(`there was an error reloading the ${command} command: ${err.message}`);
    }
  }
};