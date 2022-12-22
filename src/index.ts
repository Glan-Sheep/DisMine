import { startBot, dirname, sep } from "./deps.ts";
import { DisMine } from "./bot.ts";
import { importCommands, importEvents, importPath } from "./utils/loader.ts";
import { updateAppcationCommands } from "./utils/updateCommands.ts";
import log from "./utils/logger.ts";

log.info("Starting bot...");

await startBot(DisMine);
importPath(directory());
await importCommands();
await updateAppcationCommands();
await importEvents();

function directory(): string {
  const dir = `${dirname(import.meta.url)}${sep}`;
  return dir.replace(/\\/g, "/").replace("file://", "");
}
