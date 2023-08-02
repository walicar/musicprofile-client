import { saveRefreshTokenSTUB, refreshHandlerSTUB } from "../components/stubs/reduxTokenStubs";
import { Token } from "../features/tokens/tokensSlice"

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
    // TODO: find out how to type this
    let refreshedTokens: any = {};
    for (const service of services) {
      if (state.tokens[service] && isExpired(state.tokens[service])) {
        const data = await refreshHandlerSTUB[service]();
        await saveRefreshTokenSTUB(data.refresh_token);
        const newToken: Token = {
          access_token: data.access_token,
          expires_in: data.expires_in,
          created_at: Date(),
        };
        const thing = { ...refreshedTokens, [service]: newToken };
        refreshedTokens = thing;
      }
      return refreshedTokens;
    }
  };

export {validate};