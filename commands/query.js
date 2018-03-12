exports.run = function(client, message, args, config) {
	const request = require("request");

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing");

	message.channel.send("Getting result from Wolfram|Alpha...");

	let query = encodeURIComponent(args.join(" ").toLowerCase());
	let queryURL = `https://api.wolframalpha.com/v1/result?appid=${config.wolframAlpha}&i=${query}%3F&units=metric`;

	request({
		url: queryURL,
		headers: {"User-Agent": "Quasar Discord Bot by Solborg"}
	}, function(error, response, body) {
		console.log("Made request to: " + queryURL);
		console.log("Error: " + error);
		console.log("Status code: " + response);

		client.user.lastMessage.edit(body).catch(function (error) {
			console.log(error)
		});
	});
}