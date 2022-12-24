import { ApplicationCommandTypes } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";
import { startMine, statusMine } from "../utils/minecraft.ts";

createCommand({
  name: "start",
  description: "マイクラサーバーを起動します。",
  type: ApplicationCommandTypes.ChatInput,
  async execute(): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder();

    await statusMine().then(async () => {
      await startMine().then(() => {
        embeds
          .setTitle("✅SUCCESS")
          .setDescription(
            `マイクラサーバーは正常に稼働を始めています\n起動には数分かかる場合があります`,
          );
      }).catch(() => {
        embeds
          .setTitle("⚠️ERROR")
          .setDescription(`マイクラサーバー起動エラー`);
      });
    }).catch(() => {
      embeds
        .setTitle("⚠️ERROR")
        .setDescription(`既にマイクラサーバーは起動しています！`);
    });
    return embeds;
  },
});
