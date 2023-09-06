import React, { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import InputStyles from "@styles/InputStyles";

const LastfmButton: React.FC = () => {
  const [token, setToken]: any = useLocalStorageState("lastfm-token");
  const [username, setUsername] = useState<string>("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClick = () => {

  };

  return (
    <>
      <div className="flex items-center justify-between gap-x-3 md:gap-x-6 w-full">
        <div className="sm:flex-none rounded-md shadow-sm">
          <input
            type="text"
            name="lastfm_username"
            id="lastfm_username"
            value={token ? token : ""}
            onChange={(e) => setUsername(e.target.value)}
            className={InputStyles.isValid}
            placeholder="Lastfm Username"
          />
        </div>
      </div>
      <button
        type="button"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
        onClick={() => console.log("handle Lastfm button")}
      >
        Connect
      </button>
    </>
  );
};

export default LastfmButton;
