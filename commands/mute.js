exports.run = (client, message, args) => { // eslint-disable-line consistent-return
	if (!args.length) return message.channel.send("One or more arguments were missing.");

	let target = message.mentions.members.first();

	if (args.length === 2 && args[0].toLowerCase() === "disable") {
		message.channel.overwritePermissions(target, { SEND_MESSAGES: true })
			.then(() => {
				message.channel.send(`**${target.user.username}** is no longer muted in ${message.channel.toString()}.`);
			}).catch(error => {
				console.log(error);
				message.channel.send("There was an error when attempting to mute that member.");
			});
	} else {
		message.channel.overwritePermissions(target, { SEND_MESSAGES: false })
			.then(() => {
				message.channel.send(`**${target.user.username}** is now muted in ${message.channel.toString()}.`);
			}).catch(error => {
				console.log(error);
				message.channel.send("There was an error when attempting to mute that member.");
			});
	}
};

exports.info = {
	name: "mute",
	desc: "mutes the specified member in the current channel",
	syntax: "mute [ENABLE OR DISABLE] <TARGET MEMBER>",
	admin: true
};