import React from "react";
import { getTokens, writeTokens } from "../../services/tokens";
import useLocalStorageState from "use-local-storage-state";
const ID = process.env.REACT_APP_SUPABASE_ID;

const StubButton: React.FC = () => {
  const [session, setSession]:any = useLocalStorageState(`sb-${ID}-auth-token`);

  const click = async () => {
    console.log("hi");
    getTokens();
  };
  const otherClick = async () => {
    if (session) {
      const id = session.user.id;
      writeTokens(id);
    } else {
      console.log("couldn't find an ID at all...")
    }
  };

  return (
    <div>
      <button onClick={click}>send fetch</button>
      <button onClick={otherClick}>write tokens</button>
    </div>
  );
};

export default StubButton;
