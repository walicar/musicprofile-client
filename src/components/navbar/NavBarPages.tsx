import React, { useState, useEffect } from "react";
import NavBarPage from "./NavBarPage"
const ID = process.env.REACT_APP_SUPABASE_ID;
const NavBarPages: React.FC = () => {
  /*
  const [thing, setThing] = useState(null);
  useEffect(() => {
    const item = localStorage.getItem(`sb-${ID}-auth-token`);
    if (item) {
      setThing(JSON.parse(item));
    }
  }, []);
  */
  return(
    <div className="nav-bar__tabs">
      <NavBarPage path="/" label="Home" />
      <NavBarPage path="/dashboard" label="Dashboard" />
      <NavBarPage path="/stub" label="Stub" />
      <NavBarPage path="/login" label="Login" />
    </div>
  );
};

export default NavBarPages;