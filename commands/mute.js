exports.run = (client, message, args, config) => { // eslint-disable-line consistent-return
	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use the command **mute**.");

	if (!args.length) return message.channel.send("One or more arguments were missing.");

	let target = message.mentions.members.first();

	if (args.length === 2 && args[0].toLowerCase() === "disable") {
		message.channel.overwritePermissions(target, {
			SEND_MESSAGES: true
		}).then(() => {
			return message.channel.send(`**${target.user.username}** is no longer muted in ${message.channel.toString()}.`);
		}).catch(error => {
			console.log(error);
			return message.channel.send("There was an error when attempting to mute that member.");
		});
	} else {
		message.channel.overwritePermissions(target, {
			SEND_MESSAGES: false
		}).then(() => {
			return message.channel.send(`**${target.user.username}** is now muted in ${message.channel.toString()}.`);
		}).catch(error => {
			console.log(error);
			return message.channel.send("There was an error when attempting to mute that member.");
		});
	}
};

exports.info = {
	name: "mute",
	desc: "mutes the specified member in the current channel",
	syntax: "mute [ENABLE OR DISABLE] <TARGET MEMBER>"
};