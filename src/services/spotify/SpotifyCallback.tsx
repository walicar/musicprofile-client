import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSpotifyToken } from "./spotify.service";
import useLocalStorageState from "use-local-storage-state";
import { TokenWrapper } from "@database/TokenWrapper";
import WidgetLoad from "@components/WidgetLoad";
import config from "@utils/config";
const ID = config.SUPABASE_ID;

let initalized = false;
const SpotifyCallback: React.FC = () => {
  const [codeVerifier, , { removeItem }] = useLocalStorageState(
    "spotify-code-verifier",
  );
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [, setToken] = useLocalStorageState(`spotify-token`);
  const [params] = useSearchParams();
  const code = params.get("code");
  const navigate = useNavigate();
  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const data = await getSpotifyToken(code!, codeVerifier);
        const db = new TokenWrapper(session.access_token, session.user.id);
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
  }, [code, codeVerifier, navigate, removeItem, setToken, session]);
  return <WidgetLoad message={"Connecting to Spotify..."} />;
};
export default SpotifyCallback;
