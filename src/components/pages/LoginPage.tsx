import React, { useState, useEffect } from "react";
import PageLayout from "../PageLayout";
import SignInForm from "../forms/SignInForm";
import ForgotForm from "@components/forms/ForgotForm";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

const ID = import.meta.env.VITE_SUPABASE_ID;
const forms: {
  [form: string]: any;
} = {
  signin: <SignInForm />,
  forgot: <ForgotForm />,
};

const LoginPageBeta: React.FC = () => {
  const [session] = useLocalStorageState(`sb-${ID}-auth-token`);
  const navigate = useNavigate();
  const [form, setForm] = useState<string>("signin");
  const location = useLocation();

  useEffect(() => {
    if (session) navigate("/dashboard");
  });
  if (location.state?.from.pathname) console.log("HEY COOL");

  return (
    <PageLayout>
      <h1>Login Page</h1>
      {forms[form]}
      <button id={"signin"} onClick={() => setForm("signin")}>
        Sign In
      </button>
      <button id={"forgot"} onClick={() => setForm("forgot")}>
        Forgot
      </button>
    </PageLayout>
  );
};

export default LoginPageBeta;
