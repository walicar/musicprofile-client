import React from "react";
import HeaderPage from "./HeaderPage";

type Prop = {
  session: any;
};

const HeaderPages: React.FC<Prop> = ({ session }) => {
  return (
    <div className="hidden lg:flex lg:gap-x-12">
      <HeaderPage path="/" label="Home" />
      {session ? <HeaderPage path="/dashboard" label="Dashboard" /> : <></>}
      {session ? <HeaderPage path="/settings" label="Settings" /> : <></>}
    </div>
  );
};

export default HeaderPages;
