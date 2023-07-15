import React, { ReactNode } from "react";
import NavBar from "./navbar/NavBar";

type Props = {
  children?: React.ReactNode
};

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default PageLayout;
