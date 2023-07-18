import React from "react";
import PageLayout from "../components/PageLayout";
import callbackHandlers from "../services/callbackHandlers";

const CallbackPage: React.FC = () => {
  const service = window.location.pathname.split('/')[2];
  const callback = callbackHandlers[service];
  return (
    <PageLayout>
      <div>Put nothing here, just need empty navbar</div>
      <div>{callback}</div>
    </PageLayout>
  );
};
export default CallbackPage;
