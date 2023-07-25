import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import SignInForm from "../components/forms/SignInForm";
import SignUpForm from "../components/forms/SignUpForm";
import { useLocation } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [signIn, setSignIn] = useState<boolean>(true);
  const location = useLocation();
  if (location.state?.from.pathname) {
    console.log("HEY COOL");
  }
  return (
    <PageLayout>
      <h1>LoginPage</h1>
      {signIn ? <SignInForm /> : <SignUpForm />}
      <button
        onClick={() => {
          setSignIn(!signIn);
        }}
      >
        {signIn ? "Create an Account" : "Sign Into Your Account"}
      </button>
    </PageLayout>
  );
};

export default LoginPage;
