exports.run = (client, message, [target, ...reason], config) => {
	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use the command **kick**.");

	if (!target || !reason) return message.channel.send("One or more arguments were missing.");

	let toKick = message.mentions.members.first();

	if (!reason) return target.kick();

	toKick.send(`You were kicked from **${message.guild}** by **${message.author.username}** for:\n*${reason}*`).catch(error => {
		console.log(error);
		message.channel.send("The kick reason could not be delivered via direct message.");
	});

	return toKick.kick(reason);
};

exports.info = {
	name: "kick",
	desc: "kicks the specified member, admin-only",
	syntax: "kick <TARGET MEMBER> [REASON]"
};