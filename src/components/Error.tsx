import React from "react";

type Prop = {
  message?: any;
};
const Error: React.FC<Prop> = ({ message }) => {
  if (!message) {
    return <div>❌ An unknown error happened!</div>;
  } else {
    return <div>❌ Error: {message}</div>;
  }
};

export default Error;
