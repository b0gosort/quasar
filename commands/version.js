const Package = require("../package.json");
exports.run = (client, message) => {
	message.channel.send(`Quasar Release ${Package.version} (December 2017) is currently running.`);
};

exports.info = {
	desc: "returns the version of Quasar that is running",
	syntax: "version"
};