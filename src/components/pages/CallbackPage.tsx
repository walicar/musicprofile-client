import React from "react";
import callbackHandlers from "@services/callbackHandlers";

const CallbackPage: React.FC = () => {
  const service = window.location.pathname.split("/")[2];
  const callback = callbackHandlers[service];
  return (
    <>
      <h1>Callback Page: should redirect if there is no service...</h1>
      <>{callback ? callback : <></>}</>
    </>
  );
};
export default CallbackPage;
