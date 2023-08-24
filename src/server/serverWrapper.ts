const URL = import.meta.env.VITE_SERVER_URL;
/**
 * Abstracts fetches to the backend server
 * @param accessToken - User's JWT
 * @param id - User's ID found in database
 */

export default class ServerWrapper {
  accessToken: string;
  id: string;
  constructor(_accessToken: string, _id: string) {
    this.accessToken = _accessToken;
    this.id = _id;
  }
  async postUpdate(serviceTokens: ServiceTokens) {
    const headers = {
      // don't need Bearer here...
      Authorization: this.accessToken,
      "Content-Type": "application/json",
    };
    const body = { tokens: {...serviceTokens}, id: this.id };
    const opt = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    const res = await fetch(URL!+"/update", opt);
    if (!res.ok) return { error: res.statusText };
    const data = await res.json();
    return data;
  }
}
