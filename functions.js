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

module.exports = { loadCommands };