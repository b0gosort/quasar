exports.run = function(client, message, args, config) {
	let commands = {
		ban: {
			desc: "bans the specified member, admin-only",
			syntax: "ban <TARGET MEMBER> [REASON]"
		},
		clear: {
			desc: "clears the specified number of recent messages, admin-only",
			syntax: "clear <NUMBER OF MESSAGES>"
		},
		echo: {
			desc: "repeats the specified text and deletes the original, admin-only",
			syntax: "echo <TEXT>"
		},
		help: {
			desc: "returns a list of commands or the syntax for a specific command",
			syntax: "help [COMMAND NAME]"
		},
		kick: {
			desc: "kicks the specified member, admin-only",
			syntax: "kick <TARGET MEMBER> [REASON]"
		},
		mute: {
			desc: "mutes the specified member in the current channel",
			syntax: "mute [ENABLE OR DISABLE] <TARGET MEMBER>"
		},
		nation: {
			desc: "returns an overview of the specified NS nation",
			syntax: "nation <NATION NAME>"
		},
		ping: {
			desc: "pings the user back",
			syntax: "ping"
		},
		query: {
			desc: "returns a short answer response from Wolfram|Alpha with the given input",
			syntax: "query <QUERY>"
		},
		region: {
			desc: "returns an overview of the specified NS region",
			syntax: "region <REGION NAME>"
		},
		register: {
			desc: "assigns an appropriate role and nickname to the user, given their nation",
			syntax: "register <NATION NAME>"
		},
		reload: {
			desc: "reloads the specified command, admin-only",
			syntax: "reload <COMMAND NAME>"
		},
		shard: {
			desc: "returns the specified shard info for the specified nation or region",
			syntax: "shard <TARGET TYPE> <SHARD> <TARGET NATION OR REGION>"
		},
		version: {
			desc: "returns the version of Quasar that is running",
			syntax: "version"
		}
	};

	let commandList = Object.keys(commands);

	if (!args || args.length < 1) {
		let directory = "**Quasar Discord Bot** by Solborg\n```"
		commandList.forEach(function(cmd) {
			let cmdNamePrefix = config.prefix + cmd;

			let cmdLine = cmdNamePrefix;
			for (let i = cmdNamePrefix.length; i < 12; i++) cmdLine += " ";
			cmdLine += commands[cmd].desc;

			directory += "\n" + cmdLine;
		});
		directory += "```";

		message.author.send(directory).then(function() {
			return message.channel.send("A list of commands was delivered to your direct messages.");
		}).catch(function(error) {
			return message.channel.send("The list of commands could not be delivered to you. Make sure you have direct messages enabled.");
		});
	} else {
		if (commandList.indexOf(args[0]) === -1) return message.channel.send(`The command **${args[0]}** does not exist`);

		let cmdSyntax = "```" + config.prefix + commands[args[0]].syntax + "```";
		return message.channel.send(`**${config.prefix}${args[0]}** ${commands[args[0]].desc}.\n${cmdSyntax}`);
	}
}