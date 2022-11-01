import { DisMine } from "../bot.ts";
import log from "./logger.ts";

export async function updateAppcationCommands() {
  await DisMine.helpers.upsertGlobalApplicationCommands(
    DisMine.commands.array()
  );
  log.info(DisMine.commands.array());
}
