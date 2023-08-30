import React from "react";

type Props = {
  children?: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default PageLayout;
