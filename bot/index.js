const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");

client.on("ready", () => {
	console.log("Quasar is ready!");
});

client.on("message", (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	if (message.content.startsWith(config.prefix + "test")) {
		message.channel.send("Quasar is working.");
	} else if (message.content.startsWith(config.prefix + "ban esti")) {
		message.channel.send("**Esteriore** is no longer in the server.");
	} else if (message.content.startsWith(config.prefix + "clear")) {
		if (message.author.id !== config.ownerID) return;
		message.channel.send("I can't do that yet.");
	}
});

client.login(config.token);