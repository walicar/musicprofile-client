import React, { useEffect, useState } from "react";
import NavBarPage from "./NavBarPage";

const ID = process.env.REACT_APP_SUPABASE_ID;
const NavBarPages: React.FC = () => {
  const [check, setCheck] = useState<any>();
  useEffect(() => {
    const key = `sb-${ID}-auth-token`;
    const item = JSON.parse(localStorage.getItem(key)!);
    if (item) {
      setCheck(item);
    }
  }, []);
  return (
    <div className="nav-bar__tabs">
      <NavBarPage path="/" label="Home" />
      {check ? <NavBarPage path="/dashboard" label="Dashboard" /> : <></>}
      {check ? <NavBarPage path="/settings" label="Settings" /> : <></>} 
      <NavBarPage path="/stub" label="Stub" />
    </div>
  );
};

export default NavBarPages;
