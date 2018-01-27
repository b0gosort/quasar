const { Client, Collection } = require("discord.js");
const snekfetch = require("snekfetch");
const parseString = require("util").promisify(require("xml2js").parseString);

/** @extends {Client} */
class Quasar extends Client {
  constructor(options = {}) {
    super(options);

    /**
     * Bot commands, mapped by command name
     * @type {Collection<string, QuasarCommand>}
     */
    this.commands = new Collection();

    /**
     * Bot admins, mapped by user ID
     * @type {Collection<string, User>}
     */
    this.admins = new Collection();

    this.once("ready", async () => {
      if (!options.admins) throw new TypeError("Must provide an array of admin IDs");
      if (!Array.isArray(options.admins)) {
        console.error(`[DISCORD] ${options.admins} is not a valid array of admin IDs`);
      }
      for (const admin of options.admins) {
        if (typeof admin !== "string") throw new TypeError("Admin ID must be a string");
        const user = await this.fetchUser(admin); // eslint-disable-line no-await-in-loop
        this.admins.set(admin, user);
      }
    });
  }
  /**
   * Checks if the given user is an admin
   * @param {string} user - User to check for
   * @return {boolean}
   */
  isAdmin(user) {
    if (!this.options.admins) return false;
    if (!user) throw new RangeError("Unable to resolve user.");
    return this.admins.has(user);
  }
  /**
   * Creates a request to the nationstates API
   * @param {string} url The URL to create the request to
   * @return {Object}
   */
  request(url) {
    return new Promise(async (resolve, reject) => {
      if (!url.includes("nationstates")) reject(new TypeError("Request URL must be from the NationStates API"));
      try {
        const res = await snekfetch.get(url);
        if (res.status !== 200) reject(res.text.trim());
        const object = await parseString(res.text);
        resolve(object);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Quasar;