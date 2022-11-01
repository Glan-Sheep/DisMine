import { Amane } from "../bot.ts";
import log from "./logger.ts";

export async function updateAppcationCommands() {
  await Amane.helpers.upsertGlobalApplicationCommands(Amane.commands.array());
  log.info(Amane.commands.array());
}
