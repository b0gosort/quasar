const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");
const fs = require("fs");

const config = require("./config.json");

client.on("ready", () => {
	console.log("Quasar is ready!");
});

client.on("guildMemberAdd", (member) => {
	member.guild.channels.get(config.joinLog).send(`${member.user.username} has joined the server.`);
});

client.on("message", (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args);
	} catch (err) {
		console.error(err);
	}
});

client.login(config.token);