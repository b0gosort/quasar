const Discord = require("discord.js");
const fs = require("fs");
const { joinLog, admins, token, prefix } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commands = fs.readdirSync("./commands/");

client.on("ready", () => {
  console.log("Quasar is ready!");
  for (const command of commands) {
    client.commands.set(command.name, command);
    console.log("[DISCORD] Loaded command:", command.name);
  }
});

client.on("guildMemberAdd", (member) => {
  member.guild.channels
    .get(joinLog)
    .send(`Welcome, ${member.user.toString()}. To be assigned a role, please run:
\`\`\`
.register <YOUR_NATION_NAME>
\`\`\`
    `);
  member.send(`Welcome to **${member.guild.name}**. Please check the server for instructions to be assigned a role.`)
    .catch((error) => console.log(`Upon sending welcome DM:`, error));
});

client.on("guildMemberRemove", (member) => {
  member.guild.channels
    .get(joinLog)
    .send(`**${member.user.username}** is no longer in the server.`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  const cmd = client.commands.get(command);

  if (cmd.admin && !admins.includes(message.author.id)) {
    message.reply("you do not have permissions to run this command!");
    return;
  }

  if (cmd.args && (args.length < cmd.args)) {
    let tosay = "one or more arguments were missing.";
    if (cmd.syntax) tosay += `\nThe proper syntax is \`${prefix}${cmd.syntax}\``;
    message.reply(tosay);
    return;
  }

  try {
    cmd.run(client, message, args);
  } catch (err) {
    message.channel.send(`An error occurred while trying to run the command: \`${err.message}\`. Please contact the bot developer.`);
    console.error(`[DISCORD] Error in command ${cmd.name}:`, err);
  }
});

client.login(token);

process.on("unhandledRejection", console.error);