const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");

client.on("ready", () => {
	console.log("Quasar is ready!");
});

client.on("message", (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === "test") {
		message.channel.send("Quasar is operational.");
	} else if (command === "ban") {
		let target = args[0];
		if (target == null) {
			message.channel.send("No target was specified.");
		} else if (target.toLowerCase() === "esti") {
			message.channel.send("**Esteriore** is no longer in the server.")
		} else {
			if (message.author.id !== config.ownerID) {
				message.channel.send("You don't have permission to use the command ``ban``.");
				return;
			}
			message.channel.send("Sorry, but Quasar doesn't yet have that feature.");
		}
	} else if (command === "echo") {
		let text = args.slice(0).join(" ");
		message.channel.send(text);
	}
});

client.login(config.token);