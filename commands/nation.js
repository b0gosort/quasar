exports.run = (client, message, args, config) => {
	const request = require("request");
	const parseString = require("xml2js").parseString;

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing");

	let target = args.join(" ");
	let targetURL = `https://www.nationstates.net/cgi-bin/api.cgi?nation=${target}&q=wa+region+lastactivity+category+population+name+fullname`;

	request({
		url: targetURL,
		headers: {"User-Agent": "Quasar Discord Bot by Solborg"}
	}, function (error, response, body) {
		console.log("Made request to: " + targetURL);
		console.log("Error: " + error);
		console.log("Status code: " + response);

		//message.channel.send("```xml\n" + body + "\n```");

		parseString(body, function (error, result) {
			console.log("Parse error: " + error);

			let data = result.NATION;
			let type = data.FULLNAME[0].substring(0, data.FULLNAME[0].indexOf(data.NAME[0]) - 1);
			message.channel.send(
				`**__${data.NAME[0]}__**, ${type}\n` +
				`**Category**: ${data.CATEGORY[0]}\n` +
				`**Population**: ${data.POPULATION[0]} million \n` +
				`**Region**: ${data.REGION[0]}\n` +
				`**WA Status**: ${data.UNSTATUS[0]}\n` +
				`**Active**: ${data.LASTACTIVITY[0]}`
			);
		});
	});
}