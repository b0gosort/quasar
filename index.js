const fs = require("fs");
const { joinLog, admins, token, prefix } = require("./config.json");
const { QuasarClient } = require("./structures");

const client = new QuasarClient({
  disableEveryone: true,
  admins
});

const commands = fs.readdirSync("./commands/");

client
  .on("error", (error) => {
    console.error("[DISCORD] Error:\n", error);
  })
  .on("warn", (info) => {
    console.warn("[DISCORD] Warn:\n", info);
  })
  .on("ready", async () => {
    for (const command of commands) {
      if (!command.endsWith(".js")) {
        console.log(`[DISCORD] Loading invalid command:`, command, "; skipping...");
        continue;
      }

      const Command = require(`./commands/${command}`);
      if (typeof Command !== "function") {
        console.log(`[DISCORD] Loading invalid command:`, command, "; skipping...");
        continue;
      }

      const cmd = new Command(client);
      client.commands.set(cmd.name, cmd);

      console.log("[DISCORD] Loaded command:", cmd.name);
    }
    console.log(`[DISCORD] ${client.commands.size} commands successfully loaded!`);
    console.log("[DISCORD] Ready!");
    client.user.setActivity("Use .help");
    console.log(await client.generateInvite("ADMINISTRATOR"));
  })
  .on("guildMemberAdd", (member) => {
    member.guild.channels
      .get(joinLog)
      .send(`Welcome, ${member.user}. To be assigned a role, please run:
\`\`\`
${prefix}register <YOUR_NATION_NAME>
\`\`\`
      `);
    member.send(`Welcome to **${member.guild.name}**. Please check the server for instructions to be assigned a role.`)
      .catch((error) => console.log(`[DISCORD] Upon sending welcome DM:`, error));
  })
  .on("guildMemberRemove", (member) => {
    member.guild.channels
      .get(joinLog)
      .send(`**${member.user.username}** is no longer in the server.`);
  })
  .on("message", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const [command, ...args] = message.content.replace(prefix, "").trim().split(" ");

    const cmd = client.commands.get(command);
    if (cmd) {
      if (cmd.guildOnly && !message.guild) {
        message.reply(`The ${cmd.name} command must be used in a server.`);
        return;
      }
      if (cmd.args && (args.length < cmd.args)) {
        let tosay = "one or more required arguments were missing.";
        if (cmd.syntax) tosay += `\nThe proper syntax is \`${prefix}${cmd.syntax}\``;
        message.reply(tosay);
        return;
      }

      if (cmd.admin && !client.isAdmin(message.author.id)) {
        message.reply("you do not have permissions to run this command!");
        return;
      }

      try {
        await cmd.run(message, args);
      } catch (err) {
        message.channel.send(`An error occurred while trying to run the command: \`${err.message}\`. Please contact the bot developer.`);
        console.error(`[DISCORD] Error in command ${cmd.name}:`, err);
      }
    }
  });

client.login(token)
  .then(() => console.log(`[DISCORD] Logged in successfully as ${client.user.tag}`))
  .catch((err) => {
    console.error("[DISCORD] Failed to login:\n", err);
    process.exit(1);
  });

process.on("unhandledRejection", console.error);