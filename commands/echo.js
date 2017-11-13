exports.run = (client, message, args, config) => {
	if (message.author.id !== config.ownerID) return message.channel.send("You don't have permission to use ``echo``.");

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	let text = args.slice(0).join(" ");
	message.channel.send(text);
	message.delete();
}