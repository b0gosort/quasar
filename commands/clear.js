exports.run = (client, message, args) => {
	if (!args.length) return message.channel.send("One or more arguments were missing.");

	let numMessages = parseInt(args[0]);
	if (numMessages < 2 || numMessages > 99) return message.channel.send("The number provided was too low or too high.");
	message.channel.bulkDelete(numMessages + 1).catch(err => {
		message.channel.send(`I failed to clear the messages: ${err.message}`);
	});
	return message.channel.send(`${numMessages} messages were removed.`);
};

exports.info = {
	name: "clear",
	desc: "clears the specified number of recent messages, admin-only",
	syntax: "clear <NUMBER OF MESSAGES>",
	admin: true,
	args: true,
	argsLength: 1
};