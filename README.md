# Quasar

## A Discord bot for NationStates regions by Solborg

This bot runs with Node.js and requires a `config.json` file. Here is a template:

```json
{
	"token": "YOUR BOT USER TOKEN",
	"wolframAlpha": "YOUR WOLFRAM ALPHA APP ID",
	"prefix": "COMMAND PREFIX",
	"admins": [
		"USER ID OF PRIMARY ADMIN",
		"USER ID OF ANOTHER ADMIN"
	],
	"joinLog": "CHANNEL ID FOR JOIN/LEAVE MESSAGES",
	"region": "your_ns_region",
	"roles": {
		"citizen": "CITIZEN ROLE NAME",
		"foreign": "GUEST ROLE NAME"
	}
}
```

Here is a list of current commands:

* ban
* clear
* echo
* help
* kick
* nation
* ping
* query
* region
* register
* reload
* shard
* version

If you begin a message by mentioning the bot, it will run the query command. Command code is stored in the `commands` folder.

> By default, the `register` command will mask users as a citizen if they are a WA member in the region specified in the configuration file.