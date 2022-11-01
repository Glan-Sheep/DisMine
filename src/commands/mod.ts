import { DisMine } from "../bot.ts";
import { Command } from "../lib/mod.ts";

export function createCommand(command: Command) {
  DisMine.commands.set(command.name, command);
}
