const { Command } = require("../structures");

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      description: "Mutes the mentioned user.",
      syntax: "mute <ENABLE-OR-DISABLE> <USER> [...REASON]",
      guildOnly: true,
      admin: true,
      args: 2
    });
  }
  async run(msg, [action, member, ...reason]) {
    if (!["enable", "disable"].includes(action.toLowerCase())) return msg.reply("please provide a valid option.");
    const user = msg.mentions.members.first() || msg.guild.members.get(member);
    if (!user) return msg.reply("you must provide a user to mute.");
    switch (action.toLowerCase()) {
      case "enable":
        try {
          await msg.channel.overwritePermissions(user, { SEND_MESSAGES: false });
          return msg.reply(`I've successfully muted ${user}: ${reason.join(" ") || "No reason provided"}.`);
        } catch (err) {
          console.error("[DISCORD] Error while muting:\n", err);
          return msg.reply(`I failed to mute ${user}: ${err.message}`);
        }
      case "disable":
        try {
          await msg.channel.permissionOverwrites.get(user.id).delete();
          return msg.reply(`I successfully unmuted ${user}.`);
        } catch (err) {
          console.error("[DISCORD] Error while unmuting:\n", err);
          return msg.reply(`I failed to unmute ${user}: ${err.message}`);
        }
    }
    return null;
  }
};