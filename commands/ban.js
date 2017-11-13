exports.run = (client, message, args, config) => {
	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	if (args[0] === "esti") return message.channel.send("**Esteriore** was banned from the server.");

	if (message.author.id !== config.ownerID) return message.channel.send("You don't have permission to ban that member.");

	let target = message.mentions.members.first();
	let reason = args.slice(1).join(" ");

	target.send(`You were banned from **${message.guild}** by **${message.author.username}** for:\n*${reason}*`);
	target.ban(reason);
}