import axios from "axios";

require('dotenv').config();
const { TOKEN, DEV_API_URL } = process.env;

const Header = {
  headers: {
    Authorizatioon: "Bot " + TOKEN,
    "Content-Type": "application/json",
  },
};

export class SlashCommand {
  client: any;
  enable: boolean;
  name: string;
  description: string;
  options: Array<any>;

  interaction: any;
  id: any;
  constructor(client, options = {
    enable: true,
    name: null,
    description: "説明なし",
    options: [],
  }) {
    this.client = client;

    this.enable = options.enable ?? true;
    this.name = options.name ?? null;
    this.description = options.description ?? "説明なし";
    this.options = options.options ?? [];
  }

  setInteraction(interaction) {
    this.interaction = interaction;
  }

  respond(data:any) {
    return this.client.api
      .interactions(this.interaction.id, this.interaction.token)
      .callback.post({data: {type: 4, data: {embeds: [data]}}});
  }

  async run(client, args) {
  }

  async del() {
    const del = await axios.delete(`${DEV_API_URL}/${this.id}`, Header);
  }

  async delete() {
    const del = await axios.delete(`${DEV_API_URL}`);
  }

  async array() {
    const res = await axios.get(DEV_API_URL, Header);
    if (res.data) {
      return res.data;
    }
    return res.data;
  }
}