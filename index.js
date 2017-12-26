const { Client, Collection } = require("discord.js");
const client = new Client({ disableEveryone: true });
client.commands = new Collection();
client.admins = new Collection();

const { stripIndents } = require("common-tags");
const { loadCommands } = require("./functions");

const { prefix, admins, joinLog, token } = require("./config.json");

loadCommands(client);

client.once("ready", () => {
	admins.forEach(admin => {
		client.fetchUser(admin)
			.then(user => {
				client.admins.set(user.id, user);
			})
			.catch(err => {
				client.emit("warn", err);
			});
	});
});

client.on("ready", () => {
	console.log("Quasar is ready!");
});

client.on("guildMemberAdd", member => {
	member.guild.channels
		.get(joinLog)
		.send(stripIndents`Welcome, ${member.user.toString()}. To be assigned a role, please run:
		\`\`\`.register <YOUR NATION NAME>\`\`\``)
		.catch(console.error);
});

client.on("guildMemberRemove", member => {
	member.guild.channels.get(joinLog).send(`**${member.user.username}** is no longer in the server.`)
		.catch(console.error);
});

client.on("message", message => {
	// Check if command starts with prefix and is not run by a bot
	if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return null;

	const [command, ...args] = message.content
		.toLowerCase()
		.replace(prefix, "")
		.trim()
		.split(/ +/g);

	let cmd;
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	}
	if (cmd) {
		// Check if the person who ran the command, is an admin
		if (cmd.info.admin && !client.admins.has(message.author.id)) return message.reply("you do not have permissions to run this command.");

		// Check if there were provided enough arguments
		if (cmd.info.args && !args[cmd.info.argsLength - 1]) {
			let commandReply = `one or more arguments were missing.`;
			if (cmd.info.syntax) {
				commandReply += `\nThe proper usage for this command is: \`${prefix}${cmd.info.syntax}\``;
			}

			// Reply with the error message
			return message.reply(commandReply);
		}
		try {
			// Run the command
			cmd.run(client, message, args);
		} catch (err) {
			// Let the user know the command errored
			message.reply(stripIndents`
				an error occurred, which you shouldn't ever receive: \`${err.message}\`.
				Please contact the bot developer.
			`);
			console.error(err);
		}
	} else {
		return message.channel.send(`The command **${command}** does not exist.`); // eslint-disable-line consistent-return
	}
	return null;
});

client.on("error", console.error);

client.on("warn", console.warn);

client.login(token)
	.then(() => console.info(`Logged in successfully as ${client.user.tag}!`))
	.catch(err => {
		console.error(`Failed to login: ${err.stack}`);
		process.exit(1);
	});

process.on("unhandledRejection", (err, promise) => {
	console.error(`Unhandled promise rejection`, err, "\n", promise);
});

process.on("unhandledException", err => {
	console.error(`Unhandled exception`, err);
	process.exit(1);
});