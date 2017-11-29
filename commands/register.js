exports.run = (client, message, args, config) => { // eslint-disable-line
	const request = require("request");
	const { parseString } = require("xml2js");

	if (!args.length) return message.channel.send("One or more arguments were missing.");

	if (message.member.roles.some(role => [config.roles.citizen, config.roles.foreign].includes(role.name))) return message.channel.send("You already have a role.");

	let target = message.author;
	let nation = args.join("_").toLowerCase();
	let nationURL = `https://www.nationstates.net/cgi-bin/api.cgi?nation=${nation}&q=wa+region+name`;

	request({
		url: nationURL,
		headers: { "User-Agent": "Quasar Discord Bot by Solborg" }
	}, (error, response, body) => { // eslint-disable-line consistent-return
		console.log(`Made request to: ${nationURL}`);
		console.log(`Error: ${error}`);
		console.log(`Status code: ${response}`);

		if (body.indexOf("Error") !== -1) return message.channel.send("There was an error with getting information about that nation. Make sure not to include the nation pretitle.");

		parseString(body, (err, result) => {
			console.log(`Parse error: ${err}`);

			let data = result.NATION;
			if (data.REGION[0].split(" ").join("_").toLowerCase() !== config.region) {
				// For nations outside the region

				let foreignRole = message.guild.roles.find("name", config.roles.foreign);

				message.member.addRole(foreignRole).catch(console.error);
				client.users.get(config.admins[0]).send(`**${target.username}** was assigned the role **${config.roles.foreign}** with the nation **${nation}**.`);
				message.channel.send(`You have been assigned the role **${config.roles.foreign}**. If you are here as a diplomat, please send a message to a government member.`);
			} else if (data.UNSTATUS[0] === "WA Member") {
				// For WA members in the region

				let citizenRole = message.guild.roles.find("name", config.roles.citizen);

				message.member.addRole(citizenRole).catch(console.error);
				client.users.get(config.admins[0]).send(`**${target.username}** was assigned the role **${config.roles.citizen}** with the nation **${nation}**.`);
				message.channel.send(`You have been assigned the role **${config.roles.citizen}**. Please endorse the WA Delegate if you haven't already.`);
			} else {
				// For non-WA members in the region

				return message.channel.send("Please join the World Assembly (https://nationstates.net/page=un) to gain citizenship and try again.");
			}

			return message.member.edit({ nick: data.NAME[0] }).catch(err_ => { console.log(err_); });
		});
	});
};

exports.info = {
	name: "register",
	desc: "assigns an appropriate role and nickname to the user, given their nation",
	syntax: "register <...NATION NAME>",
	args: true,
	argsLength: 1
};