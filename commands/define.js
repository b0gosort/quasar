exports.run = function(client, message, args, config) {
	const request = require("request");

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing.");

	let word = args.join("_").toLowerCase();
	let requestURL = `https://wordsapiv1.p.mashape.com/words/${word}`;

	request({
		url: requestURL,
		headers: {"X-Mashape-Key": config.mashapeKey}
	}, function(error, response, body) {
		console.log("Made request to: " + requestURL);
		console.log("Error: " + error);
		console.log("Status code: " + response);

		let data = JSON.parse(body);
		
		if (data.success == null || data.success === true) {
			let output = `Definitions for **${word}**\n`;
			data.results.forEach(function(entry, index) {
				output += `\n${index + 1}) ${entry.partOfSpeech}: *${entry.definition}*`
			});

			return message.channel.send(output);
		} else if (data.message != null) {
			console.log(`Definition unsuccessful: ${data}`);
			return message.channel.send("The server responded with the following:\n```" + data.message + "```");
		} else {
			console.log(`Definition unsuccessful: ${data}`);
			return message.channel.send("There was an error finding a definition for that word.");
		}
	})
}