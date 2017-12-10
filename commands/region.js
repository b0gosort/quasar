exports.run = function(client, message, args, config) {
	const request = require("request");
	const parseString = require("xml2js").parseString;

	if (!args || args.length < 1) return message.channel.send("One or more arguments were missing");

	let target = args.join("_").toLowerCase();
	let targetURL = `https://www.nationstates.net/cgi-bin/api.cgi?region=${target}&q=name+flag+delegate+numnations+delegateauth+delegatevotes+tags+founder+founderauth`;

	request({
		url: targetURL,
		headers: {"User-Agent": "Quasar Discord Bot by Solborg"}
	}, function(error, response, body) {
		console.log("Made request to: " + targetURL);
		console.log("Error: " + error);
		console.log("Status code: " + response);

		if (body.indexOf("Error") !== -1) return message.channel.send("There was an error with your request.");

		parseString(body, function(error, result) {
			console.log("Parse error: " + error);

			let data = result.REGION;

			if (data.DELEGATE[0] !== "0") {
				let dNameSplit = data.DELEGATE[0].split("_");
				dNameSplit.forEach(function(word, index) {
					dNameSplit[index] = word.charAt(0).toUpperCase() + word.slice(1);
				});
				let dViewName = dNameSplit.join(" ");

				let dAuthText = "executive";
				if (data.DELEGATEAUTH[0].indexOf("X") === -1) dAuthText = "non-executive";
				
				var dNameText = `**${dViewName}**, ${data.DELEGATEVOTES[0]} votes, ${dAuthText}`;
			} else {
				var dNameText = "None";
			}

			if (data.FOUNDER[0] !== "0") {
				let fNameSplit = data.FOUNDER[0].split("_");
				fNameSplit.forEach(function(word, index) {
					fNameSplit[index] = word.charAt(0).toUpperCase() + word.slice(1);
				});
				let fViewName = fNameSplit.join(" ");

				let fAuthText = "executive";
				if (data.FOUNDERAUTH[0].indexOf("X") === -1) fAuthText = "non-executive";
				
				var fNameText = `**${fViewName}**, ${fAuthText}`;
			} else {
				var fNameText = "None";
			}

			let embed = {
				color: 0x1772c9,
				title: data.NAME[0],
				description: data.TAGS[0].TAG.join(", "),
				url: `https://nationstates.net/region=${target}`,
				thumbnail: {url: data.FLAG[0]},
				fields: [{
					name: "Population",
					value: `${data.NUMNATIONS[0]} nations`
				},
				{
					name: "Founder",
					value: fNameText
				},
				{
					name: "WA Delegate",
					value: dNameText
				}],
				footer: {text: "Generated by Quasar"}
			};
			
			message.channel.send({embed});
		});
	});
}