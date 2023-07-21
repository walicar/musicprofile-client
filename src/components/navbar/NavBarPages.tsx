import React from "react";
import NavBarPage from "./NavBarPage"

const NavBarPages: React.FC = () => {
  return (
    <div className="nav-bar__tabs">
      <NavBarPage path="/" label="Home" />
      <NavBarPage path="/dashboard" label="Dashboard" />
      <NavBarPage path="/test" label="Test" />
    </div>
  );
};

export default NavBarPages;