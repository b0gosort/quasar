exports.run = (client, message, args, config) => {
	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	if (message.author.id !== config.ownerID) return message.channel.send("You don't have permission to use the command **clear**.");

	let numMessages = args[0];
	if (numMessages < 2) return message.channel.send("The number provided was too low.");
	message.channel.bulkDelete(parseInt(numMessages) + 1);
	message.channel.send(`${numMessages} messages were removed.`);
}