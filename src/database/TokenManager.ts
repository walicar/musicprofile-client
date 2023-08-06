const ID = process.env.REACT_APP_SUPABASE_ID;
const API = process.env.REACT_APP_SUPABASE_URL;
const API_KEY = process.env.REACT_APP_SUPABASE_PUB;

export type TokenEntries = { [key: string]: string };
export class TokenManager {
  session: any;
  constructor() {
    const session = localStorage.getItem(`sb-${ID}-auth-token`);
    if (!session)
      throw Error("Trying create token manager without beign signed in");
    this.session = JSON.parse(session);
  }

  async writeTokens(tokens: TokenEntries) {
    // info should be in the form of { service_name: "token" }
    // e.x { spotify: "123456" } 
    const apiUrl = API + "/rest/v1/tokens";
    const queryParams = `id=eq.${this.session.user.id}&select=*`;
    const requestUrl = `${apiUrl}?${queryParams}`;
    const headers = {
      Authorization: `Bearer ${this.session.access_token}`,
      'Content-Type': 'application/json',
      apiKey: API_KEY!,
      "content-profile": "public",
      prefer: "return=representation",
    };
    const response = await fetch(requestUrl, {
      method: "PATCH",
      body: JSON.stringify(tokens),
      headers: headers
    })
    const data = await response.json()
    return data;
  }

  async getTokens() {
    const apiUrl = API + "/rest/v1/tokens";
    const queryParams = `id=eq.${this.session.user.id}&select=*`;
    const requestUrl = `${apiUrl}?${queryParams}`;
    const headers = {
      Authorization: `Bearer ${this.session.access_token}`,
      apiKey: API_KEY!,
      "content-type": "application/json",
    };
    try {
      const response: any = await fetch(requestUrl, { method: "GET", headers: headers });
      const data = await response.json();
      return data[0];
    } catch (e) {
      return e;
    }
  }
}
