import React, { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import InputStyles from "@styles/InputStyles";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import ServerWrapper from "@server/ServerWrapper";
const ID = import.meta.env.VITE_SUPABASE_ID;

const LastfmButton: React.FC = () => {
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [token, setToken, { removeItem }]: any =
    useLocalStorageState("lastfm-token");
  const [username, setUsername] = useState<string>("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const check = async () => {
    try {
      const { data }: any = await supabase
        .from("lastfm_topitems")
        .select("id")
        .eq("id", session.user.id);
      if (data.length === 0) {
        const server = new ServerWrapper(session.access_token);
        const message = await server.postTopitems("lastfm");
        console.log("Check postTopitems: ", message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const connect = async () => {
    await check();
    if (!username.length) {
      setIsValidUsername(false);
      setErrorMessage("Please enter your Lastfm username");
      return;
    }
    setToken({ access_token: username });
    setUsername("");
  };

  const disconnect = () => {
    removeItem();
  };

  return (
    <>
      <div className="flex items-center justify-between gap-x-3 md:gap-x-6 w-full">
        <div className="sm:flex-none relative rounded-md shadow-sm">
          <input
            type="text"
            name="lastfm_username"
            id="lastfm_username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsValidUsername(true);
            }}
            className={
              isValidUsername ? InputStyles.isValid : InputStyles.notValid
            }
            placeholder={token ? token.access_token : "Lastfm Username"}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {!isValidUsername ? (
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="pl-3 w-full">
          {!isValidUsername ? (
            <p className="text-sm text-red-600" id="email-error">
              {errorMessage}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      {token ? (
        <button
          type="button"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
          onClick={disconnect}
        >
          Disconnect
        </button>
      ) : (
        <button
          type="button"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
          onClick={connect}
        >
          Connect
        </button>
      )}
    </>
  );
};

export default LastfmButton;
