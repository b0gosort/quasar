exports.run = (client, message, args, config) => {
	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	if (args[0] === "esti") return message.channel.send("**Esteriore** was banned from the server.");

	if (message.author.id !== config.ownerID) return message.channel.send("You don't have permission to ban that member.");

	let target = message.mentions.members.first();
	let reason = args.slice(1).join(" ");
	target.ban(reason);

	message.channel.send(`**${target.user.username}** was banned from the server.`);
}