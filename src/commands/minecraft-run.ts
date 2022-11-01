import { ApplicationCommandTypes, exec, config } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

const env = config();

createCommand({
  name: "minecraft run",
  description: "マイクラサーバーを起動します。",
  type: ApplicationCommandTypes.ChatInput,
  execute(): EmbedBuilder {
    exec(`cd ${env["Minecraft_Folder_Path"]} && screen -UAmdS minecraft_server java -Xmx4G -Xmx4G -jar server.jar`, (err, stdout, stderr) => {
      if (err) {
      console.log("failed to start");
      }
    });
    const embeds = new EmbedBuilder();
    embeds
      .setTitle("マイクラサーバーを起動しています...")
      .setDescription(`起動には数分かかる場合があります`);
    return embeds;
  },
});
