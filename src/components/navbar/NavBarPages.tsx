import React from "react";
import NavBarPage from "./NavBarPage";

type Prop = {
  session: any;
}

const NavBarPages: React.FC<Prop> = ({ session }) => {
  return (
    <div className="nav-bar__tabs">
      <NavBarPage path="/" label="Home" />
      {session ? <NavBarPage path="/dashboard" label="Dashboard" /> : <></>}
      {session ? <NavBarPage path="/settings" label="Settings" /> : <></>}
      <NavBarPage path="/stub" label="Stub" />
    </div>
  );
};

export default NavBarPages;
