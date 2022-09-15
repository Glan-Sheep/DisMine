import chalk from "chalk";
import axios from "axios";
import glob from "glob";
import fs from "fs";
import path from "path";

class Ready {
  enable: boolean;
  client: any;
  constructor(client) {
    this.enable = true;
    this.client = client;
  }
  async run() {
    const client = this.client;
    console.log(chalk.bold.bgBlue("CLIENT [READY]"));
    await client.loadSlashCommands(client);
  }
}
export default Ready;