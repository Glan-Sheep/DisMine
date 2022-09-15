import { BaseApplicationCommandData, Client, Collection, Intents } from "discord.js";
import { AmaneError, SlashCommand } from "../lib";
import Parser from "./Parser";
import path from "path";
import chalk from "chalk";
import glob from "glob";

import "./Console.js";

require('dotenv').config();
const { TOKEN, DEV_API_URL } = process.env;

//import "./KeepAlive";

//client拡張
class Amane extends Client {
  slcUtil: Object;
  slashCommands: Collection<string, Object>;
  aliases: Collection<any, any>;
  commandParser: Parser;
  events: Collection<any, any>;
  slashCommandData: Array<any>;

  databaseCache: any;

  usersID: any;

  constructor() {
    super({
      partials: ["USER", "GUILD_MEMBER", "MESSAGE", "CHANNEL", "REACTION"],
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
    this.slcUtil = {
      url: DEV_API_URL,
      header: {
        headers: {
          Authorization: "Bot " + TOKEN,
          "Content-Type": "application/json",
        },
      },
    };
    /* Collection<name, slashCommand>*/
    this.slashCommands = new Collection();
    /* Collection<alias, name> */
    this.aliases = new Collection();
    this.commandParser = new Parser(this);
    this.events = new Collection();
    this.slashCommandData = new Array;

    this.databaseCache = new Array;
    this.databaseCache.users = new Collection();
    this.databaseCache.guilds = new Collection();
    this.databaseCache.members = new Collection();

    console.log(chalk.bold.bgRed("CLIENT [INITIALISED]"));

  }
  //ディレクトリ取得
  get directory() {
    let dir = `${path.dirname(require.main.filename)}${path.sep}`;
    return dir.replace(/\\/g, "/").replace("/tmp/", "/home/runner/Amane-Bot/");;
  }
  //スラッシュコマンド取得
  async loadSlashCommands(client) {
    glob(`${this.directory}/commands/**/*.js`, async (err, files) => {
      if (err) throw new Error(err);

      for (const file of files) {
        delete require.cache[require.resolve(file)];
        const command = new (require(require.resolve(file))).default(this);
        if (!(command instanceof SlashCommand)) {
          throw new Error();
        }
        //イベントリスナー
        if (command.enable) {
          this.slashCommands.set(command.name, command);
          this.slashCommandData.push({
            name: command.name,
            description: command.description,
            options: command.options,
          });
          client.ws.on("INTERACTION_CREATE", async (interaction) => {
            const cmd = interaction.data.name.toLowerCase();
            const args = interaction.data.options;
            if (cmd === command.name) {
              command.setInteraction(interaction);
              command.run(client, args);
            }
          });
        }
      }
      console.log(this.slashCommandData);
      this.application.commands.set(this.slashCommandData);
    });
    console.log(chalk.bold.bgBlue(`CLIENT_SLASH_COMMAND [REGISTERING...]`));
    return 1;
  }
  //イベントリスナー起動
  loadEvents() {
    glob(`${this.directory}/events/**/*.js`, (err, files) => {
      if (err) throw new Error(err);

      for (const file of files) {
        delete require.cache[require.resolve(file)];
        const event = new (require(require.resolve(file))).default(this),
          eventname = file.slice(file.lastIndexOf("/") + 1, file.length - 3);

        this.events.set(eventname, event);

        if (event.enable) super.on(eventname, (...args) => event.run(...args));
      }
    });
    console.log(chalk.bold.bgBlue(`CLIENT_EVENT [LISTENING]`));
  }

  //ログイン
  async Amanelogin() {
    try {
      await super.login(TOKEN);
    } catch (e) {
      console.log(e);
    }
  }


  init() {
    console.log(this.directory);
    this.loadEvents();
    this.Amanelogin();
  }
}

export default Amane;