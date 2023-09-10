import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSpotifyToken } from "./spotify.service";
import useLocalStorageState from "use-local-storage-state";
import { TokenWrapper } from "@database/TokenWrapper";
import WidgetLoad from "@components/WidgetLoad";

const ID = import.meta.env.VITE_SUPABASE_ID;

let initalized = false;
const SpotifyCallback: React.FC = () => {
  const [codeVerifier, _setCodeVerifier, { removeItem }] = useLocalStorageState(
    "spotify-code-verifier"
  );
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [_token, setToken] = useLocalStorageState(`spotify-token`);
  const [params] = useSearchParams();
  const code = params.get("code");
  const navigate = useNavigate();
  const db = new TokenWrapper(session.access_token, session.user.id);
  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const data = await getSpotifyToken(
          code!,
          codeVerifier
        );
        const { refresh_token, ...token_info } = data;
        await db.writeRefreshTokens({ spotify: refresh_token });
        setToken({ ...token_info });
        removeItem();
        navigate("/dashboard");
        // window.location.replace("/dashboard");
      } catch (e) {
        console.log(e);
      }
    };
    if (!initalized && session) {
      initalized = true;
      getRefreshToken();
    }
  }, []);
  return <WidgetLoad message={"Connecting to Spotify..."} />;
};
export default SpotifyCallback;
