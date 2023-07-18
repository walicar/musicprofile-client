import React from "react";
import NavBarButtons from "./NavBarButtons";
import NavBarPages from "./NavBarPages";

const NavBar: React.FC = () => {
  return (
    <div>
      <NavBarPages />
      <NavBarButtons />
    </div>
  );
};

export default NavBar;
