import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSpotifyToken } from "./spotify.service";
import PageLoader from "../../components/PageLoader";
import useLocalStorageState from "use-local-storage-state";
import { useSupabaseClient } from "../../contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { TokenManager } from "../../database/TokenManager";
const ID = process.env.REACT_APP_SUPABASE_ID;

let didInit = false;
const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "spotify-code-verifier",
  ]);
  const [accessToken, setAccessToken] = useLocalStorageState(
    "spotify-access-token",
  );
  const [session, setSession]: any = useLocalStorageState(
    `sb-${ID}-auth-token`,
  );
  const [params, setParam] = useSearchParams();
  const code = params.get("code");
  const codeVerifier = cookies["spotify-code-verifier"];
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const tokenManager = new TokenManager(supabase, session.user.id);

  useEffect(() => {
    const getToken = async () => {
      try {
        const data = await getSpotifyToken(code!, codeVerifier);
        tokenManager.writeTokens({ spotify: data.refresh_token });
        setAccessToken(data.access_token);
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
  }, [code, codeVerifier, setAccessToken, removeCookie]);
  return <PageLoader message={"Connecting to Spotify..."} />;
};
export default SpotifyCallback;
