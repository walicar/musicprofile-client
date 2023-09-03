import React from "react";
import callbackHandlers from "@services/callbackHandlers";

const CallbackPage: React.FC = () => {
  const service = window.location.pathname.split("/")[2];
  const callback = callbackHandlers[service];
  return (
    <div>
      <>{callback ? callback : <></>}</>
    </div>
  );
};
export default CallbackPage;
