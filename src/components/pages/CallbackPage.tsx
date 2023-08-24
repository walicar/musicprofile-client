import React from "react";
import PageLayout from "../PageLayout";
import callbackHandlers from "@services/callbackHandlers";

const CallbackPage: React.FC = () => {
  const service = window.location.pathname.split("/")[2];
  const callback = callbackHandlers[service];
  return (
    <PageLayout>
      <h1>Callback Page: should redirect if there is no service...</h1>
      <>{callback ? callback : <></>}</>
    </PageLayout>
  );
};
export default CallbackPage;
