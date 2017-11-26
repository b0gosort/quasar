# Quasar

## A Discord bot for NationStates regions by Solborg

This bot runs with Node.js.

## Setup
1. Run `npm install` in the console to install all required dependencies.
2. Edit the `config.example.json` file with all necessarily information, and rename the file to `config.json`.
3. Run `npm start` in the console, which will start the bot.

## Commands

Here is a list of current commands:

* ban
* clear
* echo
* help
* kick
* nation
* ping
* region
* register
* reload
* shard

Command code is stored in the `commands` folder.

> By default, the `register` command will mask users as a citizen if they are a WA member in the region specified in the configuration file.