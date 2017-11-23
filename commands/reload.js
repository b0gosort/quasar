exports.run = (client, message, args, config) => {
	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use the command **reload**.");

	if (!args.length) return message.channel.send("One or more arguments were missing.");

	let command = args[0];
	if (!client.commands.has(command)) return message.reply("that command does not exist");
	client.commands.delete(command);
	delete require.cache[require.resolve(`./${command}.js`)];
	const newCommand = require(`./${command}`);
	client.commands.set(newCommand.info.name, newCommand);
	message.channel.send(`The command **${command}** has been reloaded.`);
	console.log(`Reloaded the command ${command}`);
	return null;
};

exports.info = {
	name: "reload",
	desc: "reloads the specified command, admin-only",
	syntax: "reload <COMMAND NAME>"
};