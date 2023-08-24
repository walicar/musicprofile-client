import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";
import { getSpotifyToken } from "./spotify.service";
import { selectTokenCollection } from "../../redux/features/tokens/tokensSlice";
import PageLoader from "../../components/PageLoader";
import useLocalStorageState from "use-local-storage-state";
import { TokenManager } from "../../wrappers/database/TokenManager";
import store from "../../redux/app/store";
import { write } from "../../redux/features/tokens/tokensSlice";
import { useAppSelector } from "../../redux/app/hooks";

const ID = import.meta.env.VITE_SUPABASE_ID;

let initalized = false;
const SpotifyCallback: React.FC = () => {
  const [cookies, _setCookie, removeCookie] = useCookies([
    "spotify-code-verifier",
  ]);
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const tokenCollection = useAppSelector(selectTokenCollection);
  const [params] = useSearchParams();
  const code = params.get("code");
  const codeVerifier = cookies["spotify-code-verifier"];
  const tokenManager = new TokenManager(session.access_token, session.user.id);

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
        removeCookie("spotify-code-verifier", { path: "/" });
        window.location.replace("/dashboard");
      } catch (e) {
        console.log(e);
      }
    };
    if (!initalized && session) {
      // prevent infinite loop
      initalized = true;
      getToken();
    }
  }, [initalized, code, codeVerifier, removeCookie, tokenCollection]);
  return <PageLoader message={"Connecting to Spotify..."} />;
};
export default SpotifyCallback;
