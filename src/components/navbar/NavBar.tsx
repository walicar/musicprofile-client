import React from "react";
import NavBarPages from "./NavBarPages";
import NavBarButtons from "./NavBarButtons";

const NavBar: React.FC = () => {
  return (
    <div>
      <NavBarPages />
      <NavBarButtons />
    </div>
  );
};

export default NavBar;
