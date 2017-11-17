exports.run = (client, message, args, config) => {
	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use the command **kick**.");

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	let target = message.mentions.members.first();
	let reason = args.slice(1).join(" ");

	if (reason === "" || reason === " ") return target.kick();

	target.send(`You were kicked, but not banned, from **${message.guild}** by **${message.author.username}** for:\n*${reason}*`).catch(function(error) {
		console.log(error);
		message.channel.send("The kick reason could not be delivered via direct message.");
	});

	return target.kick(reason);
}