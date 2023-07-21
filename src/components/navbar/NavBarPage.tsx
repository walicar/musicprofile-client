import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  path: string;
  label: any;
};

const NavBarPage: React.FC<Props> = ({ path, label }) => {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        "nav-bar__tab " + (isActive ? "nav-bar__tab--active" : "")
      }
    >
      {label}
    </NavLink>
  );
};

export default NavBarPage;