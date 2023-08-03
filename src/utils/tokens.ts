import { saveRefreshTokenSTUB, refreshHandlerSTUB } from "../components/stubs/reduxTokenStubs";
import { Token } from "../features/tokens/tokensSlice"
import { SUPPORTED } from "../services/supportedServices";
import { TokenManager } from "../database/TokenManager";

// TODO: figure out how to type this
const getFromLocalStorage: any = () => {
  let tokens: any = {};
  const keys = Object.keys(localStorage);
  for (const service of SUPPORTED) {
    if (keys.includes(`${service}-access-token`)) {
      const token = localStorage.getItem(`${service}-access-token`);
      const copy = {...tokens, [service]:token};
      tokens = copy;
    }
  }
  return tokens;
}

const isExpired = (token: Token) => {
    const expire = new Date(token.created_at);
    expire.setSeconds(expire.getSeconds() + token.expires_in);
    const now = new Date();
    console.log("Checking if expired", now > expire);
    return now > expire;
}

// for each service requested,
// if their respective token has expired,
// - get a refreshed token
// - store the refresh_token in DB
// - update access_token in Redux
const validate = async (services: string[], state: any) => {
    const tokenManager = new TokenManager();
    // TODO: find out how to type this
    let refreshedTokens: any = {};
    let refreshTokens: any = {};
    for (const service of services) {
      if (state.tokens[service] && isExpired(state.tokens[service])) {
        const data = await refreshHandlerSTUB[service]();
        const refreshTokensCopy = {...refreshTokens, [service]: data.refresh_token};
        refreshTokens = refreshTokensCopy;
        const newToken: Token = {
          access_token: data.access_token,
          expires_in: data.expires_in,
          created_at: Date(),
        };
        const refreshedTokensCopy = { ...refreshedTokens, [service]: newToken };
        refreshedTokens = refreshedTokensCopy;
      }
      await tokenManager.writeTokens(refreshTokens);
      return refreshedTokens;
    }
  };

export {validate, getFromLocalStorage};