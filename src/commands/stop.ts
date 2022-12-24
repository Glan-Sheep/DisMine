import { ApplicationCommandTypes } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";
import { statusMine, stopMine } from "../utils/minecraft.ts";

createCommand({
  name: "stop",
  description: "マイクラサーバーを停止します。",
  type: ApplicationCommandTypes.ChatInput,
  async execute(): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder();

    await statusMine().then(async () => {
      embeds
        .setTitle("⚠️ERROR")
        .setDescription(`現在、マイクラサーバーは動いていません`);
    }).catch(async () => {
      await stopMine().then(() => {
        embeds
          .setTitle("✅SUCCESS")
          .setDescription(
            `マイクラサーバーは正常に停止を始めています\n停止には数分かかる場合があります`,
          );
      }).catch(() => {
        embeds
          .setTitle("⚠️ERROR")
          .setDescription(`マイクラサーバー停止エラー`);
      });
    });
    return embeds;
  },
});
