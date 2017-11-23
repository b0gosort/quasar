const { cleanContent } = require("../functions");
exports.run = (client, message, args) => {
	if (!args.length) return message.channel.send("One or more arguments were missing.");

	const text = args.join(" ");
	message.delete();
	return message.channel.send(cleanContent(message, text));
};

exports.info = {
	name: "echo",
	desc: "repeats the specified text and deletes the original, admin-only",
	syntax: "echo <TEXT>",
	admin: true
};