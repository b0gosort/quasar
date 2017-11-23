const fs = require("fs");
exports.run = (client, message, args, config) => {
	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use the command **reload**.");

	if (!args.length) return message.channel.send("One or more arguments were missing.");

	let command = args[0];
	const cmd = fs.readFileSync(`${__dirname}/${command}.js`);
	if (!cmd) return message.reply("that command does not exist");
	delete require.cache[require.resolve(`./${command}.js`)];
	message.channel.send(`The command **${command}** has been reloaded.`);
	return console.log(`Reloaded the command ${command}`);
};

exports.info = {
	name: "reload",
	desc: "reloads the specified command, admin-only",
	syntax: "reload <COMMAND NAME>"
};