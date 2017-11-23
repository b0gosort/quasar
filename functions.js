const fs = require("fs");
const loadCommands = Client => { // eslint-disable-line arrow-body-style
	return new Promise((resolve, reject) => {
		fs.readdir(`${__dirname}/commands/`, (err, files) => {
			if (err) reject(err);
			if (files === undefined || !files.length || typeof files === "undefined") {
				reject("No commands in the directory found."); // eslint-disable-line prefer-promise-reject-errors
			}
			console.log(files); // eslint-disable-line no-console
			files.forEach(file => {
				let Command = require(`./commands/${file}`);
				Client.commands.set(Command.info.name, Command);
				console.log(`[DISCORD]: Loading Command: ${Command.info.name}.`);
				return console.log(`[DISCORD]: Loaded command ${Command.info.name}`);
			});
		});
		resolve();
	});
};

const cleanContent = (msg, str) => { // eslint-disable-line
	return str
		.replace(/@(everyone|here)/g, "@\u200b$1")
		.replace(/<@!?[0-9]+>/g, input => {
			const id = input.replace(/<|!|>|@/g, "");
			if (msg.channel.type === "dm" || msg.channel.type === "group") {
				return msg.client.users.has(id) ? `@${msg.client.users.get(id).username}` : input;
			}

			const member = msg.channel.guild.members.get(id);
			if (member) {
				if (member.nickname) return `@${member.nickname}`;
				return `@${member.user.username}`;
			} else {
				const user = msg.client.users.get(id);
				if (user) return `@${user.username}`;
				return input;
			}
		})
		.replace(/<#[0-9]+>/g, input => {
			const channel = msg.client.channels.get(input.replace(/<|#|>/g, ""));
			if (channel) return `#${channel.name}`;
			return input;
		})
		.replace(/<@&[0-9]+>/g, input => {
			if (msg.channel.type === "dm" || msg.channel.type === "group") return input;
			const role = msg.guild.roles.get(input.replace(/<|@|>|&/g, ""));
			if (role) return `@${role.name}`;
			return input;
		});
};

module.exports = {
	loadCommands,
	cleanContent
};