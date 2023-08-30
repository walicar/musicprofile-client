import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  path: string;
  label: any;
};

const HeaderPage: React.FC<Props> = ({ path, label }) => {
  return (
    <NavLink
      to={path}
      end
      className="text-sm font-semibold leading-6 text-gray-900"
    >
      {label}
    </NavLink>
  );
};

export default HeaderPage;
