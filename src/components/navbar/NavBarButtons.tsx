import { useState, useEffect } from "react";
import LogoutButton from "../buttons/LogoutButton";
import LoginButton from "../buttons/LoginButton";
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
      {check ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default NavBarPages;
