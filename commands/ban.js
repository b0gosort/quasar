module.exports = {
  name: "ban",
  description: "Bans the specified member.",
  admin: true,
  args: 2,
  syntax: "ban <MEMBER> <...REASON>",
  run: async (client, message, [toban, ...reason]) => {
    if (toban === "esti") return message.channel.send("**Esteriore** is no longer in the server.");
    const toBan = message.mentions.members.first() || message.guild.members.get(toban);
    if (!toBan) return message.reply(`you must provide a user to ban.`);
    if (!toBan.bannable) return message.reply(`I cannot ban that user.`);
    try {
      await toBan.send(`You have been banned from ${message.guild.name} for the following reason: ${reason.join(" ") || "No reason provided"}`);
      await toBan.ban({ days: 1, reason: reason.join(" ") || "No reason provided" });
      return message.channel.send(`${message.author}, I successfully banned ${toBan.user.tag}: ${reason.join(" ")}`);
    } catch (err) {
      console.error(err);
      return message.channel.send(`${message.author}, I failed to ban ${toBan.user.tag}: ${err.message}`);
    }
  }
};