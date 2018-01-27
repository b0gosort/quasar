const { Command } = require("../structures");

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      description: "Bans the specified member",
      syntax: "ban <MEMBER> [...REASON]",
      admin: true,
      args: 1,
      guildOnly: true
    });
  }

  async run(message, [toban, ...reason]) {
    if (toban === "esti") return message.channel.send("**Esteriore** is no longer in the server.");
    const toBan = message.mentions.users.first() || this.client.users.get(toban);
    if (!toBan) return message.reply(`you must provide a user to ban.`);
    if (!toBan.bannable || this.client.isAdmin(toBan)) return message.reply(`I cannot ban that user.`);
    try {
      await toBan.send(`
You have been banned from ${message.guild.name} for the following reason:
\`${reason.join(" ") || "No reason provided"}\`.
If you think this is a mistake, please contact ${message.author.tag}.
      `).catch(() => null);
      await message.guild.ban(toBan, { days: 1, reason: reason.join(" ") || "No reason provided" });
      return message.channel.send(`
${message.author}, I successfully banned ${toBan.user.tag}: \`${reason.join(" ") || "No reason specified"}\`
      `);
    } catch (err) {
      console.error(err);
      return message.channel.send(`${message.author}, I failed to ban ${toBan.user.tag}: \`${err.message}\``);
    }
  }
};