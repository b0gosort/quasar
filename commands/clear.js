module.exports = {
  name: "clear",
  description: "Clears the specified amount of messages in the current channel, up to 99.",
  admin: true,
  args: 1,
  run: (client, message, [number]) => {
    if (isNaN(number) && (parseInt(number) > 100 || parseInt(number) < 2)) {
      return message.reply(`${number} is not a valid amount of messages. Please provide a number more than 2 and lower than 100.`);
    }
    number = parseInt(number);
    return message.channel.bulkDelete(number)
      .catch((error) => message.channel.send(`${message.author}, I failed to clear the messages: \`${error.message}\``));
  },
  syntax: "clear <NUMBER>"
};