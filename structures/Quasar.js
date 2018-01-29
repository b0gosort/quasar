const { Client, Collection } = require("discord.js");
const snekfetch = require("snekfetch");
const parseString = require("util").promisify(require("xml2js").parseString);
const Package = require("../package.json");

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

    /**
     * Cached nations
     * @type {Collection<string, Object>}
     */
    this.nationCache = new Collection();

    /**
     * Cached regions
     * @type {Collection<string, Object>}
     */
    this.regionCache = new Collection();

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
    this.setInterval(this.sweepCache, 600e3);
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
        if (this.nationCache.has(url)) resolve(this.nationCache.get(url));
        if (this.regionCache.has(url)) resolve(this.regionCache.get(url));
        const res = await snekfetch.get(url,
          { headers: { "User-Agent": `Quasar v${Package.version} by Solborg (https://github.com/b0gosort/quasar/)` } });
        if (res.status !== 200) reject(res.text.trim());
        const object = await parseString(res.text);
        if (url.includes("?nation=")) this.nationCache.set(url, object);
        if (url.includes("?region=")) this.regionCache.set(url, object);
        resolve(object);
      } catch (err) {
        reject(err);
      }
    });
  }
  /**
   * Sweeps the cache
   * @return {boolean} If the cache sweep was successfull
   * @private
   */
  sweepCache() {
    try {
      this.nationCache.clean();
      this.regionCache.clean();
      return true;
    } catch (err) {
      console.error("[CACHE]", err);
      return false;
    }
  }
}

module.exports = Quasar;