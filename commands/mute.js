exports.run = function(client, message, args, config) {
	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use the command **mute**.");

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	let target = message.mentions.members.first();

	message.channel.overwritePermissions(target, {
		"SEND_MESSAGES": false,
		"ATTACH_FILES": false
	}).then(function() {
		return message.channel.send(`**${target.user.username}** is now muted in ${message.channel.toString()}.`);
	}).catch(function(error) {
		console.log(error);
		return message.channel.send("There was an error when attempting to mute that member.");
	});
}