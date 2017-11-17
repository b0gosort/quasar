exports.run = function(client, message, args, config) {
	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use the command **mute**.");

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	let target = message.mentions.members.first();

	if (args.length === 2 && args[0].toLowerCase() === "disable") {
		message.channel.overwritePermissions(target, {
			"SEND_MESSAGES": true
		}).then(function() {
			return message.channel.send(`**${target.user.username}** is no longer muted in ${message.channel.toString()}.`);
		}).catch(function(error) {
			console.log(error);
			return message.channel.send("There was an error when attempting to unmute that member.");
		});
	} else {
		message.channel.overwritePermissions(target, {
			"SEND_MESSAGES": false
		}).then(function() {
			return message.channel.send(`**${target.user.username}** is now muted in ${message.channel.toString()}.`);
		}).catch(function(error) {
			console.log(error);
			return message.channel.send("There was an error when attempting to mute that member.");
		});
	}
}