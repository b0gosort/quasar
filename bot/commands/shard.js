exports.run = (client, message, args) => {
	let format = "``" + config.prefix + "shard <TARGET TYPE> <SHARD> <TARGET>";

	let [type, shard, ...target] = args;

	if (type === "help") {
		message.channel.send("This will return the specified shard from the specified nation.\n" + format);
		return;		
	} else if (type == null || shard == null || target == null) {
		message.channel.send("One or more arguments were missing. Try running ``" + config.prefix + "shard help");
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