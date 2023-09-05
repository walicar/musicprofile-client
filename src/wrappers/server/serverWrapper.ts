const URL = import.meta.env.VITE_SERVER_URL;
/**
 * Abstracts fetches to the backend server
 * @param accessToken - User's JWT
 * @param id - User's ID found in database
 */

export default class ServerWrapper {
  accessToken: string;
  constructor(_accessToken: string) {
    this.accessToken = _accessToken;
  }
  async postUpdate(serviceTokens: ServiceTokens) {
    const headers = {
      // don't need Bearer here...
      Authorization: this.accessToken,
      "Content-Type": "application/json",
    };
    const body = { tokens: { ...serviceTokens } };
    const opt = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    const res = await fetch(URL! + "/update", opt);
    if (!res.ok) return { error: res.statusText };
    const data = await res.json();
    return data;
  }
  async deleteAccount() {
    const headers = {
      // don't need Bearer here...
      Authorization: this.accessToken,
      "Content-Type": "application/json",
    };
    const opt = {
      method: "DELETE",
      headers: headers,
    };
    const res = await fetch(URL! + "/delete", opt);
    if (!res.ok) return { error: res.statusText };
    const data = await res.json();
    return data;
  }
}
