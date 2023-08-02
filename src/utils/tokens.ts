import { Token } from "../features/tokens/tokensSlice"
const isExpired = (token: Token) => {
    const expire = new Date(token.created_at);
    expire.setSeconds(expire.getSeconds() + token.expires_in);
    const now = new Date();
    console.log("Checking if expired", now > expire);
    return now > expire;
}

export {isExpired};