const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");

const commandFiles = fs.readdirSync("./commands/");

client.on("ready", () => {
	console.log("Quasar is ready!");
});

client.on("guildMemberAdd", (member) => {
	member.guild.channels.get(config.joinLog).send(`Welcome, ${member.user.toString()}. To be assigned a role, please say:\n` + "```.register <YOUR NATION NAME>```");
	member.send(`Welcome to **${member.guild.name}**. Please check the server for instructions to be assigned a role.`).catch((error) => {
		return console.log(`Upon sending welcome DM: ${error}`);
	})
});

client.on("guildMemberRemove", (member) => {
	member.guild.channels.get(config.joinLog).send(`**${member.user.username}** is no longer in the server.`);
});

client.on("message", (message) => {
	if ((!message.content.startsWith(config.prefix) && !message.content.startsWith(client.user.toString())) || message.author.bot) return;

	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	var command;

	if (message.content.startsWith(client.user.toString())) {
		args.shift();
		command = "query";
	} else {
		command = args.shift().toLowerCase();
	}

	if (commandFiles.indexOf(command + ".js") === -1) return;

	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args, config);
	} catch (err) {
		console.error(err);
	}
});

client.login(config.token);