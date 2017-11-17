exports.run = (client, message, args, config) => {
	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use **reload**.");

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	let command = args[0];
	delete require.cache[require.resolve(`./${command}.js`)];
	message.channel.send(`The command **${command}** has been reloaded.`);
	console.log(`Reloaded the command ${command}`);
}