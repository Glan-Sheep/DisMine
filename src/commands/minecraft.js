const { SlashCommand } = require("../lib");
const { MessageEmbed } = require("discord.js");
const { exec } = require('child_process');

require("dotenv").config();
const { Minecraft_Folder_Path } = process.env;

class Minecraft extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "minecraft",
      description: "マイクラサーバー用コマンド",
      options: [
        {
          type: 1,
          name: "run",
          description: "マイクラサーバーを起動します",
        }
      ]
    });
  }

  async run(client) {
    const interaction = this.interaction;

    const embeds = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("マイクラサーバーを起動しています")
      .setDescription(`
      `);
    super.respond(embeds);

    exec(`cd ${Minecraft_Folder_Path} && screen -UAmdS minecraft_server java -Xmx4G -Xmx4G -jar server.jar`, (err, stdout, stderr) => {
      if (err) {
      console.log("failed to start");
      }
    });
  }
}

exports.default = Minecraft;
