import { config, exec } from "../deps.ts";

const env = config();

const SC_NAME = env["GAME_SCREEN_NAME"];
const MC_PATH = env["Minecraft_Folder_Path"];

function statusMine(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      `screen -ls|grep -q "${SC_NAME}"`,
      (err, stdout, stderr) => {
        if (!err) {
          reject("NG");
        } else {
          resolve("OK");
        }
      },
    );
  });
}

function startMine(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${MC_PATH} && screen -UAmdS ${SC_NAME} java -Xmx8G -Xmx8G -jar server.jar`,
      (err, stdout, stderr) => {
        if (err) {
          reject("ERROR");
        } else {
          resolve("SUCCESS");
        }
      },
    );
  });
}

function stopMine(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      `screen -p 0 -S ${SC_NAME} -X eval 'stuff "say '10'秒後にサーバーを停止します\n"' && sleep 10 && screen -p 0 -S ${SC_NAME} -X eval 'stuff "stop\n"'`,
    );
    resolve("SUCCESS");
  });
}

export { restartMine, startMine, statusMine, stopMine };
