import { startBot, dirname, sep } from "./deps.ts";
import { DisMine } from "./bot.ts";
import { importCommands, importEvents } from "./utils/loader.ts";
import { updateAppcationCommands } from "./utils/updateCommands.ts";
import log from "./utils/logger.ts";

log.info("Starting bot...");

await startBot(DisMine);
await importCommands(directory());
await importEvents(directory());

await updateAppcationCommands();

function directory(): string {
  const dir = `${dirname(import.meta.url)}${sep}`;
  return dir
    .replace(/\\/g, "/")
    .replace("/tmp/", "/home/runner/DisMine-Bot/")
    .replace("file://", "");
}
