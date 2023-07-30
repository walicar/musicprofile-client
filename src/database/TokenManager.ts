type ServiceTokens = {
  spotify?: string;
  lastfm?: string;
};

export class TokenManager {
  client: any;
  id: any;
  constructor(client: any, id: any) {
    this.client = client;
    this.id = id;
  }
  async writeTokens(tokens: ServiceTokens) {
    // info should be in the form of { service_name: "token" }
    // e.x { spotify: "123456" }
    const { data } = await this.client
      .from("tokens")
      .update(tokens)
      .eq("id", this.id)
      .select();
    console.log("wroteTokens: ", data);
    return data;
  }

  async getTokens() {
    try {
      const { data } = await this.client
        .from("tokens")
        .select("id, spotify, lastfm");
      console.log("getTokens", data);
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
