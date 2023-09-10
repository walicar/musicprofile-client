import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "../contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import InputStyles from "@styles/InputStyles";
import ErrorList from "@components/ErrorList";
import testEmail from "@utils/email";

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const supabase: SupabaseClient<any, "public", any> = useSupabaseClient();
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateForm = () => {
    let flag = true;
    if (!testEmail(email)) {
      setErrorMessages((prevMessages) => [
        ...prevMessages,
        "Email address is invalid",
      ]);
      setIsEmailValid(false);
      flag = false;
    }
    if (password.length === 0) {
      setErrorMessages((prevMessages) => [
        ...prevMessages,
        "Password is missing",
      ]);
      setIsPasswordValid(false);
      flag = false;
    }
    return flag;
  };

  const handleSignin = async (e: React.FormEvent) => {
    setErrorMessages([]);
    e.preventDefault();
    if (!validateForm()) return;
    const { error }: any = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setErrorMessages((prevMessages) => [...prevMessages, error.message]);
      return;
    }
    navigate("/dashboard");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
  }, [setErrorMessages]);

  return (
    <div className="flex flex-1 flex-col justify-center py-1 sm:px-6 lg:px-8 relative ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <h2 className="mt-3 sm:mt-6  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-neutral-50">
          Log into your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white dark:bg-slate-900 dark:border-slate-600 dark:border px-6 py-6 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSignin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-neutral-50"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(true);
                  }}
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className={
                    isEmailValid ? InputStyles.isValid : InputStyles.notValid
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-neutral-50"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsPasswordValid(true);
                  }}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className={
                    isPasswordValid ? InputStyles.isValid : InputStyles.notValid
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
              <div className="text-sm leading-6">
                <a
                  onClick={() => navigate("/forgot")}
                  className="cursor-pointer font-semibold text-orange-500 hover:text-orange-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
      {errorMessages.length != 0 ? (
        <div className="md:absolute md:top-1 lg:top-[160px] md:right-2 lg:right-[65px] xl:right-[115px] md:w-64">
          <ErrorList messages={errorMessages} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SigninPage;
