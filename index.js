const { Client, Collection } = require("discord.js");
const client = new Client({ disableEveryone: true });
client.commands = new Collection();
const fs = require("fs");
const { stripIndents } = require("common-tags");

const config = require("./config.json");

fs.readdir(`${__dirname}/commands/`, (err, files) => {
	if (err) throw err;
	files.forEach(file => {
		let { info } = require(`./commands/${file}`);
		if (!info) return;
		client.commands.set(info.name, info);
	});
});
client.on("ready", () => {
	console.log("Quasar is ready!");
});

client.on("guildMemberAdd", member => {
	member.guild.channels
		.get(config.joinLog)
		.send(stripIndents`Welcome, ${member.user.toString()}. To be assigned a role, please run:
		\`\`\`.register <YOUR NATION NAME>\`\`\``);
});

client.on("guildMemberRemove", member => {
	member.guild.channels.get(config.joinLog).send(`**${member.user.username}** is no longer in the server.`);
});

client.on("message", message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) {
		return message.channel.send(`The command **${command}** does not exist.`); // eslint-disable-line consistent-return
	}
	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args, config);
	} catch (err) {
		// Let the user know the command errored
		message.reply(`an error occurred, which you shouldn't ever receive: \`${err.message}\`. Please contact the bot developer.`);
		console.error(err);
	}
});

client.login(config.token);