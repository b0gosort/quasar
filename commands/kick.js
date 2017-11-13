exports.run = (client, message, args, config) => {
	if (message.author.id !== config.ownerID) return message.channel.send("You don't have permission to use the command ``kick``.");

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	let target = message.mentions.members.first();
	let reason = args.slice(1).join(" ");
	target.kick(reason);

	message.channel.send(`**${target.user.username}** was kicked from the server.`);
}