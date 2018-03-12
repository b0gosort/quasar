exports.run = function(client, message, args, config) {
	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	if (args[0] === "esti") return message.channel.send("**Esteriore** is no longer in the server.");

	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to ban that member.");

	let target = message.mentions.members.first();
	let reason = args.slice(1).join(" ");

	if (reason === "" || reason == " ") return target.ban();

	target.send(`You were banned from **${message.guild}** by **${message.author.username}** for:\n*${reason}*`).catch(function(error) {
		console.log(error);
		message.channel.send("The ban reason could not be delivered via direct message.");
	});

	return target.ban(reason_;)
}