const API = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_PUB;

export type TokenEntries = { [key: string]: string };
export class TokenManager {
  accessToken: string;
  id: string;
  constructor(_accessToken: string, _id: string) {
    this.accessToken = _accessToken;
    this.id = _id;
  }

  async writeTokens(tokens: TokenEntries) {
    // info should be in the form of { service_name: "token" }
    // e.x { spotify: "123456" }
    console.log("Writing tokens");
    const apiUrl = API + "/rest/v1/tokens";
    const queryParams = `id=eq.${this.id}&select=*`;
    const requestUrl = `${apiUrl}?${queryParams}`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
      apiKey: API_KEY!,
      "content-profile": "public",
      prefer: "return=representation",
    };
    const response = await fetch(requestUrl, {
      method: "PATCH",
      body: JSON.stringify(tokens),
      headers: headers,
    });
    const data = await response.json();
    console.log("write OK?", data);
    return data;
  }

  async getTokens() {
    const apiUrl = API + "/rest/v1/tokens";
    const queryParams = `id=eq.${this.id}&select=*`;
    const requestUrl = `${apiUrl}?${queryParams}`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      apiKey: API_KEY!,
      "content-type": "application/json",
    };
    try {
      const response: any = await fetch(requestUrl, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      return data[0];
    } catch (e) {
      return e;
    }
  }
}
