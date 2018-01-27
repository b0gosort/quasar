const { Command } = require("../structures");

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      description: "Kicks the specified member.",
      syntax: "kick <MEMBER> [...REASON]",
      args: 1,
      admin: true,
      guildOnly: true
    });
  }
  async run(message, [member, ...reason]) {
    const toBan = message.mentions.members.first() || message.guild.members.get(member);
    if (!toBan) return message.reply(`you must provide a user to kick.`);
    if (!toBan.kickable || this.client.isAdmin(toBan)) return message.reply(`I cannot ban that user.`);
    try {
      await toBan.send(`
You have been kicked from ${message.guild.name} for the following reason:
\`${reason.join(" ") || "No reason provided"}\`.
      `).catch(() => null);
      await toBan.kick({ days: 1, reason: reason.join(" ") || "No reason provided" });
      return message.channel.send(`
${message.author}, I successfully kicked ${toBan.user.tag}: \`${reason.join(" ") || "No reason specified"}\`
      `);
    } catch (err) {
      console.error(err);
      return message.channel.send(`${message.author}, I failed to kick ${toBan.user.tag}: \`${err.message}\``);
    }
  }
};