import React from "react";

type Prop = {
  message?: string;
};

const PageLoader: React.FC<Prop> = ({ message }) => {
  return (
    <div>
      <p>{message ? message : "Loading..."}</p>
    </div>
  );
};

export default PageLoader;
