import { ApplicationCommandTypes, exec, config } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";
import log from "../utils/logger.ts";

const env = config();

createCommand({
  name: "minecraft-start",
  description: "マイクラサーバーを起動します。",
  type: ApplicationCommandTypes.ChatInput,
  execute(): EmbedBuilder {
    exec(`cd ${env["Minecraft_Folder_Path"]} && screen -UAmdS minecraft_server java -Xmx8G -Xmx8G -jar server.jar`, (err, stdout, stderr) => {
      if (err) {
        log.error(`マイクラサーバー起動エラー: ${stderr}`)
        return
      }
      log.info(`マイクラサーバーは正常に稼働を始めています： ${stdout}`)
    });
    const embeds = new EmbedBuilder();
    embeds
      .setTitle("マイクラサーバーを起動しています...")
      .setDescription(`起動には数分かかる場合があります`);
    return embeds;
  },
});
