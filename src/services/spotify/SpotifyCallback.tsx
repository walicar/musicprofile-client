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
  const [cookies, _setCookie, removeCookie] = useCookies([
    "spotify-code-verifier",
  ]);
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
          cookies["spotify-code-verifier"],
        );
        const { refresh_token, ...token_info } = data;
        await db.writeRefreshTokens({ spotify: refresh_token });
        setToken({ ...token_info });
        removeCookie("spotify-code-verifier", { path: "/" });
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
