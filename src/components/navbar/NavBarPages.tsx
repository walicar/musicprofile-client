import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import NavBarPage from "./NavBarPage";

const ID = process.env.REACT_APP_SUPABASE_ID;
const NavBarPages: React.FC = () => {
  const [check, setCheck] = useState<any>();
  useEffect(() => {
    const key = `sb-${ID}-auth-token`;
    const item = JSON.parse(localStorage.getItem(key)!);
    console.log("ITEM", item);
    if (item) {
      setCheck(item);
    }
  }, []);
  return (
    <div className="nav-bar__tabs">
      <NavBarPage path="/" label="Home" />
      {check ? <NavBarPage path="/dashboard" label="Dashboard" /> : <></>}
      <NavBarPage path="/stub" label="Stub" />
      <NavBarPage path="/login" label="Login" />
    </div>
  );
};

export default NavBarPages;
