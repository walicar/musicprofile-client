import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import PageLoader from "./PageLoader";

type Props = {
    component: React.ComponentType<object>;
}

const AuthenticationGuard: React.FC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};

export default AuthenticationGuard;