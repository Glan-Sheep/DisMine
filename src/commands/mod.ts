import { Amane } from "../bot.ts";
import { Command } from "../lib/mod.ts";

export function createCommand(command: Command) {
  Amane.commands.set(command.name, command);
}
