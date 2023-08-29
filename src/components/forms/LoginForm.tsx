import React, { useState } from "react";
import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";
import ForgotForm from "@components/forms/ForgotForm";

const forms: {
  [form: string]: any;
} = {
  signin: <SignInForm />,
  signup: <SignUpForm />,
  forgot: <ForgotForm />,
};

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<string>("signin");
  return (
    <>
      {forms[form]}
      <button id={"signin"} onClick={() => setForm("signin")}>
        Sign In
      </button>
      <button id={"signup"} onClick={() => setForm("signup")}>
        Sign Up
      </button>
      <button id={"forgot"} onClick={() => setForm("forgot")}>
        Forgot
      </button>
    </>
  );
};

export default LoginForm;
