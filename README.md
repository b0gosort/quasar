# Quasar

> A Discord bot for NationStates regions by Solborg

## Setup

**Requirements: [Node.js](https://nodejs.org/en/) v8.0 or higher.**

1. Clone the repository: `git clone https://github.com/b0gosort/quasar.git`;
2. Install all required dependencies: `npm install`;
3. Rename the `config.example.json` to `config.json`, and replace all info with your own info;
4. Run the bot: `npm start`.

5. **OPTIONAL**: Use [pm2](http://pm2.keymetrics.io/) to keep the bot running 24/7 on your server: `pm2 start index.js`.

## Commands

You can view the commands by using the `help` command.

Commands are stored in the `commands` folder.

> By default, the `register` command will mask users as a citizen if they are a WA member in the region specified in the configuration file.