import { ApplicationCommandTypes, exec, config } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

createCommand({
  name: "minecraft stop",
  description: "マイクラサーバーを停止します。",
  type: ApplicationCommandTypes.ChatInput,
  execute(): EmbedBuilder {
    exec(`screen -S minecraft_server -X stop`, (err, stdout, stderr) => {
      if (err) {
      console.log("failed to stop");
      }
    });
    const embeds = new EmbedBuilder();
    embeds
      .setTitle("マイクラサーバーを停止しています...");
    return embeds;
  },
});
