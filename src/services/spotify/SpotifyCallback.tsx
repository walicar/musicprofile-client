import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSpotifyToken } from "./spotify.service";
import PageLoader from "../../components/PageLoader";
import useLocalStorageState from "use-local-storage-state";
import { TokenManager } from "../../database/TokenManager";
import store from "../../app/store";
import { write } from "../../features/tokens/tokensSlice";
const ID = import.meta.env.VITE_SUPABASE_ID;

let didInit = false;
const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, _setCookie, removeCookie] = useCookies([
    "spotify-code-verifier",
  ]);
  const [_accessToken, setAccessToken] = useLocalStorageState(
    "spotify-access-token",
  );
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [params] = useSearchParams();
  const code = params.get("code");
  const codeVerifier = cookies["spotify-code-verifier"];
  const tokenManager = new TokenManager();

  useEffect(() => {
    const getToken = async () => {
      try {
        const data = await getSpotifyToken(code!, codeVerifier);
        await tokenManager.writeTokens({ spotify: data.refresh_token });
        // dispatach save token to redux instead of access token
        const token = {
          access_token: data.access_token,
          expires_in: data.expires_in,
          created_at: data.created_at,
        };
        store.dispatch(write({ spotify: token }));
      } catch (e) {
        console.log(e);
      }
    };
    if (!didInit && session) {
      // prevent infinite loop
      didInit = true;
      getToken();
      removeCookie("spotify-code-verifier", { path: "/" });
      navigate("/dashboard");
    }
  }, [code, codeVerifier, setAccessToken, removeCookie, session]);
  return <PageLoader message={"Connecting to Spotify..."} />;
};
export default SpotifyCallback;
