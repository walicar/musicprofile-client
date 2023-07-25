import React from "react";
import NavBarPages from "./NavBarPages";
import NavBarButtons from "./NavBarButtons";
import useLocalStorageState from "use-local-storage-state";
const ID = process.env.REACT_APP_SUPABASE_ID;

const NavBar: React.FC = () => {
  const [session, setSession] = useLocalStorageState(`sb-${ID}-auth-token`);
  return (
    <div>
      <NavBarPages session={session}/>
      <NavBarButtons session={session}/>
    </div>
  );
};

export default NavBar;
