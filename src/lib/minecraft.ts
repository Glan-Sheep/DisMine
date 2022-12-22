import { exec, config } from "../deps.ts";
import { EmbedBuilder } from "./mod.ts";

const env = config();

function statusMine(): boolean {
  let res: boolean = false;
  exec(`pgrep -f ${env["GAME_SCREEN_NAME"]}`, (err, stdout, stderr) => {
    if (!stdout) {
      res = true;
    }
  });
  return res;
}

function startMine(req: EmbedBuilder): EmbedBuilder {
  const embeds = req;
  exec(
    `cd ${env["Minecraft_Folder_Path"]} && screen -UAmdS minecraft_server java -Xmx8G -Xmx8G -jar server.jar`,
    (err, stdout, stderr) => {
      if (err) {
        embeds
          .setTitle("⚠️ERROR")
          .setDescription(`マイクラサーバー起動エラー: ${stderr}`);
      } else {
        embeds.setTitle("✅SUCCESS")
          .setDescription(`マイクラサーバーは正常に稼働を始めています
起動には数分かかる場合があります`);
      }
    }
  );
  return embeds;
}

function stopMine(req: EmbedBuilder): EmbedBuilder {
  const embeds = req;
  exec(`screen -p 0 -S ${env["GAME_SCREEN_NAME"]} -X eval 'stuff "say '${env["WAIT_SECONDS_TO_STOP"]}'秒後にサーバーを停止します\n"' && sleep ${env["WAIT_SECONDS_TO_STOP"]} && screen -p 0 -S ${env["GAME_SCREEN_NAME"]} -X eval 'stuff "stop\n"'`,(err, stdout, stderr) => {
    if (err) {
      embeds
      .setTitle("⚠️ERROR")
      .setDescription(`マイクラサーバー停止エラー: ${stderr}`);
    }else{
      embeds
        .setTitle("✅SUCCESS")
        .setDescription(`マイクラサーバーを停止しています。`);
    }
  })
  return embeds;
}

function restartMine(req: EmbedBuilder): EmbedBuilder {
  const embeds = req;
  exec(`screen -p 0 -S ${env["GAME_SCREEN_NAME"]} -X eval 'stuff "say '${env["WAIT_SECONDS_RESTART"]}'秒後にサーバーを再起動します\n"' && screen -p 0 -S ${env["GAME_SCREEN_NAME"]} -X eval 'stuff "say すぐ接続可能になるので、しばらくお待ち下さい"' && sleep ${env["WAIT_SECONDS_TO_RESTART"]} && screen -p 0 -S ${env["GAME_SCREEN_NAME"]} -X eval 'stuff"\n && cd ${env["GAME_SCREEN_NAME"]} && screen -UAmdS ${"GAME_SCREEN_NAME"} java -Xmx8G -Xmx8G -jar server.jar`, (err,stdout,stderr) => {
    if (err) {
      embeds
        .setTitle("⚠️ERROR")
        .setDescription(`マイクラサーバー再起動エラー: ${stderr}`);
    }else{
      embeds
        .setTitle("✅SUCCESS")
        .setDescription(`マイクラサーバーを停止しています。`);
    }
  })
  return embeds;
}

export { statusMine, startMine, stopMine, restartMine };
