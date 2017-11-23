const request = require("request");
exports.run = (client, message, args) => {
	let [type, shard, ...target] = args;
	if (!args.length || !type || !shard || !target) return message.channel.send("One or more arguments were missing.");


	let targetURL = `https://www.nationstates.net/cgi-bin/api.cgi?${type}=${target.join(" ")}&q=${shard}`;
	request({
		url: targetURL,
		headers: { "User-Agent": "Quasar Discord Bot by Solborg" }
	}, (error, response, body) => {
		console.log(`Made request to: ${targetURL}`);
		console.log(`Error: ${error}`);
		console.log(`Status code: ${response}`);

		return message.channel.send(body, { code: "XML" });
	});
	return null;
};

exports.info = {
	name: "shard",
	desc: "returns the specified shard info for the specified nation or region",
	syntax: "shard <TARGET TYPE> <SHARD> <TARGET NATION OR REGION>"
};