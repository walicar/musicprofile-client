import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken } from "./spotify.service";
import PageLoader from "../../components/PageLoader";
import useLocalStorageState from "use-local-storage-state";
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
  const [session, setSession]:any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [params, setParam] = useSearchParams();
  const code = params.get("code");
  console.log("Spotify Callback");
  const codeVerifier = cookies["spotify-code-verifier"];

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessToken(code!, codeVerifier, session.user.id);
        setAccessToken(token);
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
