import React, { useEffect } from "react";
import PageLayout from "../PageLayout";
import SignUpForm from "@components/forms/SignUpForm";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

const ID = import.meta.env.VITE_SUPABASE_ID;

const SignupPage: React.FC = () => {
  const [session] = useLocalStorageState(`sb-${ID}-auth-token`);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (session) navigate("/dashboard");
  });
  if (location.state?.from.pathname) console.log("HEY COOL");
  return (
    <PageLayout>
      <h1>Signup Page</h1>
      <SignUpForm />
    </PageLayout>
  );
};

export default SignupPage;
