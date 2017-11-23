exports.run = (client, message) => {
	message.channel.send("Pinging...")
		.then(msg => msg.edit(`${message.author.toString()}, pong! The latency was ${msg.createdTimestamp - message.createdTimestamp}ms.`))
		.catch(console.error);
};

exports.info = {
	name: "ping",
	desc: "pings the user back",
	syntax: "ping"
};