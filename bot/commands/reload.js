exports.run = (client, message, args) => {
	const config = require("../config.json");

	if (message.author.id !== config.ownerID) {
		message.channel.send("You don't have permission to use ``reload``.");
		return;
	}

	let command = args[0];
	if (command == null) return message.channel.send("One or more arguments were missing.");
	delete require.cache[require.resolve(`./${command}.js`)];
	message.channel.send("The command ``" + command + "`` has been reloaded.");
}