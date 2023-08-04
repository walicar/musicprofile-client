import axios from "axios";
const ID = process.env.REACT_APP_SUPABASE_ID;
const API = process.env.REACT_APP_SUPABASE_URL;
const API_KEY = process.env.REACT_APP_SUPABASE_PUB;
export class TokenManager {
  session: any;
  constructor() {
    const session = localStorage.getItem(`sb-${ID}-auth-token`);
    if (!session)
      throw Error("Trying create token manager without beign signed in");
    this.session = JSON.parse(session);
  }
  async writeTokens(tokens: any) {
    // info should be in the form of { service_name: "token" }
    // e.x { spotify: "123456" }
    const apiUrl = API + "/rest/v1/tokens";
    const queryParams = `id=eq.${this.session.user.id}&select=*`;
    const requestUrl = `${apiUrl}?${queryParams}`;
    const headers = {
      Authorization: `Bearer ${this.session.access_token}`,
      apiKey: API_KEY,
      "content-profile": "public",
      prefer: "return=representation",
    };
    try {
      const response: any = await axios.patch(requestUrl, tokens, {
        headers: headers,
      });
      console.log("wroteTokens: ", response.data);
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async getTokens() {
    const apiUrl = API + "/rest/v1/tokens";
    const queryParams = `id=eq.${this.session.user.id}&select=*`;
    const requestUrl = `${apiUrl}?${queryParams}`;
    const headers = {
      Authorization: `Bearer ${this.session.access_token}`,
      apiKey: API_KEY,
      "content-type": "application/json",
    };
    try {
      const response: any = await axios.get(requestUrl, { headers: headers });
      return response.data[0];
    } catch (e) {
      return e;
    }
  }
}
