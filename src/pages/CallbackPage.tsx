import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import PageLayout from "../components/PageLayout";

const CallbackPage: React.FC = () => {
  const { error } = useAuth0();

  if (error) {
    return (<div>Callback Error</div>);
  }

  return (
    <PageLayout>
      <div>Put nothing here, just need empty navbar</div>
    </PageLayout>
  );
};
export default CallbackPage;
