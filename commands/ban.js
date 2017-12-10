exports.run = (client, message, [target, ...reason]) => {
	if (!target) return message.channel.send("One or more arguments were missing.");

	if (target === "esti") return message.channel.send("**Esteriore** is no longer in the server.");

	if (!client.admins.has(message.author.id)) return message.channel.send("You don't have permission to ban that member.");

	let toBan = message.mentions.members.first();

	if (!reason) return target.ban();

	toBan.send(`You were banned from **${message.guild}** by **${message.author.username}** for:\n*${reason}*`).catch(error => {
		console.error(error);
		message.channel.send("The ban reason could not be delivered via direct message.");
	});

	return toBan.ban({ reason: reason.join(" ") })
		.then(() => message.reply("the ban was succesfull."))
		.catch(err => message.reply(`I failed to ban ${toBan.tag}: ${err.message}`));
};

exports.info = {
	name: "ban",
	desc: "bans the specified member, admin-only",
	syntax: "ban <TARGET MEMBER> [...REASON]",
	args: true,
	argsLength: 1,
	admin: true
};
