exports.run = (client, message, [target, ...reason]) => {
	if (!target || !reason) return message.channel.send("One or more arguments were missing.");

	let toKick = message.mentions.members.first();

	if (!reason) return target.kick();

	toKick.send(`You were kicked from **${message.guild}** by **${message.author.username}** for:\n*${reason}*`).catch(error => {
		console.log(error);
		message.channel.send("The kick reason could not be delivered via direct message.");
	});

	return toKick.kick(reason)
		.then(() => message.reply("the kick was succesfull."))
		.catch(err => message.reply(`I failed to kick ${toKick.tag}: ${err.message}`));
};

exports.info = {
	name: "kick",
	desc: "kicks the specified member, admin-only",
	syntax: "kick <TARGET MEMBER> [REASON]",
	admin: true,
	args: true,
	argsLength: 1
};