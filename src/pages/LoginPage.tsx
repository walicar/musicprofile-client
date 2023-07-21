import React, {useState} from "react";
import PageLayout from "../components/PageLayout";
import SignInForm from "../components/forms/SignInForm";
import SignUpForm from "../components/forms/SignUpForm";

const LoginPage: React.FC = () => {
    const [signIn, setSignIn] = useState<boolean>(true);
  return (
    <PageLayout>
        <h1>LoginPage</h1>
        {signIn ? <SignInForm /> : <SignUpForm />}
        <button onClick={() => {setSignIn(!signIn)}}>{signIn ? "Create an Account" : "Sign Into Your Account" }</button>
    </PageLayout>
  );
};

export default LoginPage;
