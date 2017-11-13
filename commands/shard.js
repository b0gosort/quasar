exports.run = (client, message, args, config) => {
	const request = require("request");

	if (!args || args.length < 3) return message.channel.send("One or more arguments were missing.");

	let [type, shard, ...target] = args;

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