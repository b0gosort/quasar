const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
	console.log("Quasar is ready!");
});

client.on("message", (message) => {
	if (message.content.startsWith("quasar test")) {
		message.channel.send("Quasar is working.");
	}
});

client.login(config.token);