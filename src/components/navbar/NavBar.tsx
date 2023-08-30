import React from "react";
import HeaderPages from "./HeaderPages";
import useLocalStorageState from "use-local-storage-state";
const ID = import.meta.env.VITE_SUPABASE_ID;

const NavBar: React.FC = () => {
  const [session] = useLocalStorageState(`sb-${ID}-auth-token`);
  return (
    <div>
      <HeaderPages session={session} />
    </div>
  );
};

export default NavBar;
