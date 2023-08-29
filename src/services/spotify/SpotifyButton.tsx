import React from "react";
import { useCookies } from "react-cookie";
import { generateRandomString, getAuthURL } from "./spotify.service";
import useLocalStorageState from "use-local-storage-state";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";

const ID = import.meta.env.VITE_SUPABASE_ID;

const SpotifyButton: React.FC = () => {
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [_cookies, setCookie] = useCookies(["spotify-code-verifier"]);
  const [token, _setToken, { removeItem }] =
    useLocalStorageState("spotify-token");

  const check = async () => {
    try {
      const { data }: any = await supabase
        .from("spotify_topitems")
        .select("id")
        .eq("id", session.user.id);
      if (data.length === 0) {
        console.log("insert here");
        await supabase.from("spotify_topitems").insert({ id: session.user.id });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const connect = async () => {
    await check();
    const verifier = generateRandomString(128);
    setCookie("spotify-code-verifier", verifier, { path: "/" });
    const URL = await getAuthURL(verifier);
    window.location.replace(URL);
  };

  const disconnect = () => {
    removeItem();
  };

  return (
    <div>
      <>
        {token ? (
          <button onClick={disconnect}>disconnect from spotify</button>
        ) : (
          <button onClick={connect}>connect to spotify</button>
        )}
      </>
    </div>
  );
};

export default SpotifyButton;
