const { cleanContent } = require("../functions");
exports.run = (client, message, args, config) => {
	if (config.admins.indexOf(message.author.id) === -1) return message.channel.send("You don't have permission to use the command **echo**.");

	if (!args.length) return message.channel.send("One or more arguments were missing.");

	const text = args.join(" ");
	message.delete();
	return message.channel.send(cleanContent(message, text));
};

exports.info = {
	name: "echo",
	desc: "repeats the specified text and deletes the original, admin-only",
	syntax: "echo <TEXT>"
};