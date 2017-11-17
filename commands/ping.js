exports.run = (client, message, args, config) => {
	message.channel.send(`${message.author.toString()}, your ping has been returned.`);
}