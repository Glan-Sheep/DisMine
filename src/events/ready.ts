import { DisMine } from "../bot.ts";
import log from "../utils/logger.ts";

DisMine.events.ready = () => {
  log.info(`[READY]`);
};
