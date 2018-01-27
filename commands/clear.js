const { Command } = require("../structures");

module.exports = class ClearCommand extends Command {
  constructor(client) {
    super(client, {
      name: "clear",
      description: "Clears the specified amount of messages in the current channel, up to 99.",
      syntax: "clear <NUMBER>",
      admin: true,
      args: 1
    });
  }

  async run(message, [number]) {
    if (isNaN(number) || (parseInt(number) > 100 || parseInt(number) < 2)) {
      return message.reply(`${number} is not a valid amount of messages. Please provide a number more than 2 and lower than 100.`);
    }
    number = parseInt(number);
    const messages = await message.channel.bulkDelete(number)
      .catch((error) => message.channel.send(`${message.author}, I failed to clear the messages: \`${error.message}\``));

    return message.reply(`I successfully cleared ${messages.size} messages`);
  }
};