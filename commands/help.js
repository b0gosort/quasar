const { stripIndents } = require("common-tags");
exports.run = (client, message, args) => {
	let messages = [];
	if (!args.length) {
		messages.push(message.author.send(stripIndents`
			**Quasar Discord Bot** by Solborg
			\`\`\`
      ${client.commands.map(command => `${command.info.name}: ${command.info.desc}`).join("\n")}
			\`\`\`
		`));
		messages.push(message.channel.send("A list of commands was delivered to your direct messages."));
		return Promise.all(messages).catch(() => { // eslint-disable-line
			return message.channel.send("The list of commands could not be delivered to you. Make sure you have direct messages enabled.");
		});
	} else {
		if (!client.commands.has(args[0])) return message.reply(`The command ${args[0]} does not exist.`);
		let command = client.commands.get(args[0]);
		return message.channel.send(stripIndents`
			${command.info.name}: ${command.info.desc}
			\`\`\`
      ${command.info.syntax}
			\`\`\`
		`);
	}
};

exports.info = {
	name: "help",
	desc: "returns a list of commands or the syntax for a specific command",
	syntax: "help [...COMMAND NAME]"
};