import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBarPage from "./NavBarPage";

const NavBarPages: React.FC = () => {
    const { isAuthenticated } = useAuth0();
  
    return (
      <div className="nav-bar__tabs">
        <NavBarPage path="/" label="Home" />
        <NavBarPage path="/public" label="Public" />
        {isAuthenticated && (
          <>
            <NavBarPage path="/profile" label="Profile" />
            <NavBarPage path="/protected" label="Protected" />
            <NavBarPage path="/admin" label="Admin" />
          </>
        )}
      </div>
    );
  };

  export default NavBarPages;

  