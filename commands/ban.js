exports.run = (client, message, [target, ...reason], config) => {
	if (!target) return message.channel.send("One or more arguments were missing.");

	if (target === "esti") return message.channel.send("**Esteriore** is no longer in the server.");

	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to ban that member.");

	target = message.mentions.members.first();

	if (!reason) return target.ban();

	target.send(`You were banned from **${message.guild}** by **${message.author.username}** for:\n*${reason}*`).catch(error => {
		console.log(error);
		message.channel.send("The ban reason could not be delivered via direct message.");
	});

	return target.ban({ reason });
};

exports.info = {
	name: "ban",
	desc: "bans the specified member, admin-only",
	syntax: "ban <TARGET MEMBER> [REASON]"
};