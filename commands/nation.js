exports.run = (client, message, args, config) => {
	const request = require("request");
	const parseString = require("xml2js").parseString;

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing");

	let target = args.join("_").toLowerCase();
	let targetURL = `https://www.nationstates.net/cgi-bin/api.cgi?nation=${target}&q=wa+region+lastactivity+category+fullname+flag`;

	request({
		url: targetURL,
		headers: {"User-Agent": "Quasar Discord Bot by Solborg"}
	}, function (error, response, body) {
		console.log("Made request to: " + targetURL);
		console.log("Error: " + error);
		console.log("Status code: " + response);

		if (body.indexOf("Error") !== -1) return message.channel.send("There was an error with your request.");

		parseString(body, function (error, result) {
			console.log("Parse error: " + error);

			let data = result.NATION;
			let embed = {
				color: 0x1772c9,
				title: data.FULLNAME[0],
				description: data.CATEGORY[0],
				url: `https://nationstates.net/nation=${target}`,
				thumbnail: {url: data.FLAG[0]},
				fields: [{
					name: "Region",
					value: data.REGION[0]
				},
				{
					name: "WA Status",
					value: data.UNSTATUS[0]
				},
				{
					name: "Active",
					value: data.LASTACTIVITY[0]
				}]
			};
			
			message.channel.send({embed});
		});
	});
}