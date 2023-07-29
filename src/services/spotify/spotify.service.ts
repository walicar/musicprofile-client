import { writeTokens } from "../tokens";
const clientId = process.env.REACT_APP_SPOTIFY_ID;
const redirectUri = process.env.REACT_APP_WEBAPP_URL + "/callback/spotify";
const functionUrl = process.env.REACT_APP_SUPABASE_URL + "/functions/v1/";

export function generateRandomString(length: number) {
  // used for code_verifier and state
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(str: ArrayBuffer) {
    return btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(str)))
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export async function getAuthURL(codeVerifier: any) {
  // codeVerifier is any because useLocalStorageState has :unknown type on
  // localStorage values.
  let codeChallenge = await generateCodeChallenge(codeVerifier);
  let state = generateRandomString(16);
  let scope = "user-read-private user-read-email user-top-read";
  let args = new URLSearchParams({
    response_type: "code",
    client_id: clientId!,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });
  return "https://accounts.spotify.com/authorize?" + args;
}

export async function getAccessToken(code: string, codeVerifier: any, id: any) {
  // codeVerifier is any because useLocalStorageState has :unknown type on
  // localStorage values.
  let body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId!,
    code_verifier: codeVerifier,
  });
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });
    if (!response.ok) throw new Error("HTTP fail: " + response.status);
    const data = await response.json();
    // const response2 = await sendRefreshToken(data.refresh_token);
    const token = { spotify: data.refresh_token };
    await writeTokens(id, token);
    // console.log(response2.message); // this is stub code
    return data.access_token;
  } catch (e) {
    console.log(e);
  }
}
