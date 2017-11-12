const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");

client.on("ready", () => {
	console.log("Quasar is ready!");
});

client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (message.content.startsWith(config.prefix + "test")) {
		message.channel.send("Quasar is working.");
	}

	if (message.content.startsWith(config.prefix + "ban esti")) {
		message.channel.send("**Esteriore** is no longer in the server.");
	}
});

client.login(config.token);