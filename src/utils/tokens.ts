import { Token, Tokens } from "../features/tokens/tokensSlice";
import { SUPPORTED } from "../services/supportedServices";
import { TokenManager, TokenEntries } from "../database/TokenManager";
import { refreshHandlers } from "../services/refreshHandlers";

// TODO: figure out how to type this
const getFromLocalStorage: any = () => {
  let tokens: any = {};
  const keys = Object.keys(localStorage);
  for (const service of SUPPORTED) {
    if (keys.includes(`${service}-access-token`)) {
      const token = localStorage.getItem(`${service}-access-token`);
      const copy = { ...tokens, [service]: token };
      tokens = copy;
    }
  }
  return tokens;
};

const isExpired = (token: Token) => {
  const expire = new Date(token.created_at);
  expire.setSeconds(expire.getSeconds() + token.expires_in);
  const now = new Date();
  console.log("Checking if expired", now > expire);
  return now > expire;
};

// for each service requested,
// if their respective token has expired,
// - get a refreshed token
// - store the refresh_token in DB
// - update access_token in Redux
const validate = async (services: string[], token_collection: Tokens) => {
  const tokenManager = new TokenManager();
  let refreshedTokens: Tokens = {};
  let newRefreshTokens: TokenEntries = {};
  // might want to refactor this into, getToken("service");
  let curRefreshTokens: TokenEntries = await tokenManager.getTokens();
  if (token_collection != undefined) {
    for (const service of services) {
      const token: any = token_collection[service]; // gotta fix this
      if (!token) break;
      if (token_collection[service] && isExpired(JSON.parse(token))) {
        const data = await refreshHandlers[service](curRefreshTokens[service]);
        if (data.error) {
          console.log("Error received from tokens");
          break;
        }
        const newRefreshTokensCopy = {
          ...newRefreshTokens,
          [service]: data.refresh_token,
        };
        newRefreshTokens = newRefreshTokensCopy;
        const newToken: Token = {
          access_token: data.access_token,
          expires_in: data.expires_in,
          created_at: Date(),
        };
        const refreshedTokensCopy = { ...refreshedTokens, [service]: newToken };
        refreshedTokens = refreshedTokensCopy;
        console.log("did some copies");
      }
    }
    await tokenManager.writeTokens(newRefreshTokens);
    return refreshedTokens;
  } else {
    return {};
  }
};

const tokenToService = (tokenCollection: Tokens): ServiceTokens => {
  let serviceTokens = {};
  for (const service in tokenCollection) {
    serviceTokens = {...serviceTokens, [service]: tokenCollection[service].access_token};
  }
  return serviceTokens;
}

export { validate, getFromLocalStorage, tokenToService };
