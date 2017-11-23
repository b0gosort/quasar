exports.run = (client, message, args) => {
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
	syntax: "reload <COMMAND NAME>",
	admin: true
};