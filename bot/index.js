const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const request = require("request");

client.on("ready", () => {
	console.log("Quasar is ready!");
	console.log(config.joinLog);
});

client.on("guildMemberAdd", (member) => {
	member.guild.channels.get(config.joinLog).send(`${member.user.username} has joined the server.`);
})

client.on("message", (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	//Test
	if (command === "test") {
		message.channel.send("Quasar is operational.");
	}

	//Ban
	else if (command === "banesti") {
		message.channel.send("**Esteriore** is no longer in the server.");
	}

	//Echo
	else if (command === "echo") {
		let text = args.slice(0).join(" ");
		message.channel.send(text);
	}

	//Shard
	else if (command === "shard") {
		let [type, shard, ...target] = args;

		if (type === "help") {
			message.channel.send("Returns the specified shard from the specified nation or region.\n``q.shard <TYPE> <SHARD> <TARGET>``");
			return;
		} else if (type == null || shard == null || target == null) {
			message.channel.send("One or more arguments missing from\n``q.shard <TYPE> <SHARD> <TARGET>``");
			return;
		}

		let targetURL = `https://www.nationstates.net/cgi-bin/api.cgi?${type}=${target.join(" ")}&q=${shard}`;
		request({
			url: targetURL,
			headers: {"User-Agent": "Quasar Discord Bot by Solborg"}
		}, function(error, response, body) {
			console.log("Made request to: " + targetURL);
			console.log("Error: " + error);
			console.log("Status code: " + response);

			message.channel.send("```xml\n" + body + "\n```");
		});
	}
});

client.login(config.token);