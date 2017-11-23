exports.run = (client, message, args, config) => {
	if (!args.length) return message.channel.send("One or more arguments were missing.");

	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use the command **clear**.");

	let numMessages = parseInt(args[0]);
	if (numMessages < 2 || numMessages > 99) return message.channel.send("The number provided was too low or too high.");
	message.channel.bulkDelete(numMessages + 1).catch(err => {
		return message.channel.send(`I failed to clear the messages: ${err.message}`)
	});
	return message.channel.send(`${numMessages} messages were removed.`);
};

exports.info = {
	name: "clear",
	desc: "clears the specified number of recent messages, admin-only",
	syntax: "clear <NUMBER OF MESSAGES>"
};