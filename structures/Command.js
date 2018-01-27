/**
 * Creates a new command for Quasar
 */
class QuasarCommand {
  /**
   * Creates a new Command
   * @param {QuasarClient} client The client to use
   * @param {CommandInfo} info Command info
   */
  constructor(client, info) {
    /**
     * Command info
     * @typedef {Object} CommandInfo
     * @property {string} name The name of the command
     * @property {string} description The command description
     * @property {string} syntax The command syntax
     * @property {boolean} admin If the command is admin-only
     * @property {number} args The amount of **required** arguments for the commands
     * @property {boolean} guildOnly If the command should only be ran in guild channels
     */
    this.validateInfo(info);

    /**
     * The client to use for the command
     * @type {QuasarClient}
     * @readonly
     */
    this.client = client;

    /**
     * @type {string}
     */
    this.name = info.name;

    /**
     * @type {string}
     */
    this.description = info.description;

    /**
     * @type {string}
     */
    this.syntax = info.syntax;

    /**
     * @type {boolean}
     */
    this.admin = info.admin;

    /**
     * @type {number}
     */
    this.args = info.args;

    /**
     * @type {boolean}
     */
    this.guildOnly = info.guildOnly;
  }

  /**
   * Runs the command
   * @param {Message} message The command message
   * @param {string[]} args The command arguments
   * @return {Promise<void>}
   */
  // eslint-disable-next-line no-unused-vars, require-await
  async run(message, args) {
    throw new Error(`The ${this.constructor.name} command does not have a run method`);
  }
  /**
   * @param {CommandInfo} info Command info to validate
   * @return {boolean}
   */
  validateInfo(info) {
    if (typeof info !== "object") throw new TypeError("Info must be an object");
    if (typeof info.name !== "string") throw new TypeError("Command name must be a string");
    if (typeof info.description !== "string") throw new TypeError("Command description must be a string");
    if (info.syntax && typeof info.syntax !== "string") throw new TypeError("Command syntax must be a string");
    if (info.admin && typeof info.admin !== "boolean") throw new TypeError("Admin property must be a boolean");
    if (info.args && typeof info.args !== "number") throw new TypeError("Amount of arguments must be a number");
    return true;
  }
}

module.exports = QuasarCommand;