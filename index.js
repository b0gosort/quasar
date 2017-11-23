const { Client, Collection } = require("discord.js");
const client = new Client({ disableEveryone: true });
client.commands = new Collection();

const { stripIndents } = require("common-tags");
const { loadCommands } = require("./functions");

const config = require("./config.json");

loadCommands(client);

let prefix;
client.on("ready", () => {
	console.log("Quasar is ready!");
	prefix = new RegExp(`^(<@!?${client.user.id}>|${config.prefix}?)`, "i");
});

client.on("guildMemberAdd", member => {
	member.guild.channels
		.get(config.joinLog)
		.send(stripIndents`Welcome, ${member.user.toString()}. To be assigned a role, please run:
		\`\`\`.register <YOUR NATION NAME>\`\`\``)
		.catch(console.error);
});

client.on("guildMemberRemove", member => {
	member.guild.channels.get(config.joinLog).send(`**${member.user.username}** is no longer in the server.`)
		.catch(console.error);
});

client.on("message", message => {
	// Check if command starts with prefix and is not run by a bot
	if (message.author.bot || !prefix || !prefix.test(message.content)) return;

	const [command, ...args] = message.content
		.toLowerCase()
		.replace(prefix, "")
		.trim()
		.split(/ +/g);

	let cmd;
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else {
		return message.channel.send(`The command **${command}** does not exist.`); // eslint-disable-line consistent-return
	}
	if (cmd) {
		try {
			cmd.run(client, message, args, config);
		} catch (err) {
			// Let the user know the command errored
			message.reply(stripIndents`
				an error occurred, which you shouldn't ever receive: \`${err.message}\`.
				Please contact the bot developer.
			`);
			console.error(err);
		}
	}
});

client.login(config.token);

process.on("unhandledRejection", async (err, promise) => {
	console.error(`Unhandled promise rejection at ${await promise}: ${err.stack}`);
});

process.on("unhandledException", err => {
	console.error(`Unhandled exception: ${err.stack}`);
	process.exit(1);
});