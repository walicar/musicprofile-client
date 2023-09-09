const API = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_PUB;
import { refreshHandlers } from "@services/refreshHandlers";
import { getLocalStorageToken } from "@utils/localStorage";
import { isEmpty } from "@utils/util";
export type TokenEntries = { [key: string]: string };
export class TokenWrapper {
  accessToken: string;
  id: string;
  constructor(_accessToken: string, _id: string) {
    this.accessToken = _accessToken;
    this.id = _id;
  }

  async writeRefreshTokens(tokens: TokenEntries) {
    // info should be in the form of { service_name: "token" }
    // e.x { spotify: "123456" }
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
    return data;
  }

  async getRefreshTokens() {
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

  async getRefreshToken(service: string) {
    // fix queryParams, it gets every token, we don't really need that,
    // could use GQL instead.
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
      return data[0][service];
    } catch (e) {
      return e;
    }
  }

  async validateTokens(services: string[]) {
    let refreshedTokens: any = {};
    let newRefreshTokens: TokenEntries = {};
    // might want to refactor this into, getRefreshToken("service");
    for (const service of services) {
      const token: any = await getLocalStorageToken(`${service}-token`); // gotta fix this
      const expired = isTokenExpired(token);
      if (token && expired) {
        const curRefreshToken = await this.getRefreshToken(service);
        const { refresh_token, access_token, expires_in, error } =
          await refreshHandlers[service](curRefreshToken);
        if (error) {
          break;
        }
        const newRefreshTokensCopy = {
          ...newRefreshTokens,
          [service]: refresh_token,
        };
        newRefreshTokens = newRefreshTokensCopy;
        const refreshedTokensCopy = {
          ...refreshedTokens,
          [service]: {
            access_token,
            expires_in,
            created_at: Date(),
          },
        };
        refreshedTokens = refreshedTokensCopy;
      }
    }
    if (!isEmpty(newRefreshTokens)) {
      await this.writeRefreshTokens(newRefreshTokens);
    } else {
    }
    return refreshedTokens as Tokens;
  }
}

const isTokenExpired = (token: Token): boolean => {
  const expire = new Date(token.created_at);
  expire.setSeconds(expire.getSeconds() + token.expires_in);
  const now = new Date();
  return now > expire;
};
