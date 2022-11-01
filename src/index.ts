import { startBot, dirname, sep } from "./deps.ts";
import { Amane } from "./bot.ts";
import { importCommands, importEvents } from "./utils/loader.ts";
import { updateAppcationCommands } from "./utils/updateCommands.ts";
import log from "./utils/logger.ts";

log.info("Starting bot...");

await startBot(Amane);
await importCommands(directory());
await importEvents(directory());

await updateAppcationCommands();

function directory(): string {
  const dir = `${dirname(import.meta.url)}${sep}`;
  return dir
    .replace(/\\/g, "/")
    .replace("/tmp/", "/home/runner/Amane-Bot/")
    .replace("file://", "");
}
