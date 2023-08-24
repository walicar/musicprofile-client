const clientId = import.meta.env.VITE_SPOTIFY_ID;
const redirectUri = import.meta.env.VITE_CLIENT_URL + "/callback/spotify";

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
      String.fromCharCode.apply(null, Array.from(new Uint8Array(str))),
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

export async function getSpotifyToken(code: string, codeVerifier: any) {
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
    console.log("From getSpotifyToken", data);
    const createdAt = Date();
    const newData = { ...data, created_at: createdAt };
    return newData;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function refreshSpotifyToken(refreshToken: any) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId!,
  });
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });
  const data = await response.json();
  return data;
}
