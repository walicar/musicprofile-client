const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_BASE_URL + "/settings";

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
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(str))))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export async function getAuthURL(codeVerifier: string) {
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

export async function getAccessToken(code: string, codeVerifier: string) {
  let body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId!,
    code_verifier: codeVerifier,
  });
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });
  const token = await response.json();
  return JSON.stringify(token);
}
