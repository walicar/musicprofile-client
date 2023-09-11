import React from "react";
import { generateRandomString, getAuthURL } from "./spotify.service";
import useLocalStorageState from "use-local-storage-state";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import ServerWrapper from "@server/ServerWrapper";

const ID = import.meta.env.VITE_SUPABASE_ID;

const SpotifyButton: React.FC = () => {
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [, setCodeVerifier] = useLocalStorageState("spotify-code-verifier")
  const [token, , { removeItem }] =
    useLocalStorageState("spotify-token");

  const check = async () => {
    // if user does not have a spotify_topitems record, then insert it
    try {
      const { data }: any = await supabase
        .from("spotify_topitems")
        .select("id")
        .eq("id", session.user.id);
      if (data.length === 0) {
        const server = new ServerWrapper(session.access_token);
        await server.postTopitems("spotify");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const connect = async () => {
    await check();
    const verifier = generateRandomString(128);
    setCodeVerifier(verifier);
    const URL = await getAuthURL(verifier);
    window.location.replace(URL);
  };

  const disconnect = () => {
    removeItem();
  };

  return (
    <>
      {token ? (
        <button
          className="font-semibold text-orange-500 hover:text-orange-400"
          onClick={disconnect}
        >
          Disconnect
        </button>
      ) : (
        <button
          className="font-semibold text-orange-500 hover:text-orange-400"
          onClick={connect}
        >
          Connect
        </button>
      )}
    </>
  );
};

export default SpotifyButton;
