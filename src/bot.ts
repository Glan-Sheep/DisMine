import {
  BotWithCache,
  BotWithHelpersPlugin,
  Collection,
  createBot,
  enableCachePlugin,
  enableHelpersPlugin,
  enablePermissionsPlugin,
  GatewayIntents,
  config,
  enableCacheSweepers,
} from "./deps.ts";
import { Command } from "./lib/mod.ts";

const env = config();

const bot = createBot({
  token: env["TOKEN"],
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages,
  events: {},
});

// Enable All Plugins
enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  commands: Collection<string, Command>;
}

export const DisMine = bot as BotClient;

DisMine.commands = new Collection();
