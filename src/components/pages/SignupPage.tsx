import React, { useRef, useEffect, useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import InputStyles from "@styles/InputStyles";
import testEmail from "@utils/email";
import ErrorList from "@components/ErrorList";
import config from "@utils/config";

const KEY = config.HCAP_KEY;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const supabase: SupabaseClient<any, "public", any> = useSupabaseClient();
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const recipient = useRef<string>("");
  const [show, setShow] = useState(false);
  const captcha = useRef<any>();


  const clearForm = () => {
    setEmail("")
    setIsEmailValid(true)
    setErrorMessages([])
    setPassword("")
    setConfirmPassword("")
    setIsPasswordValid(true)
    setCaptchaToken("")
  }

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
    if (!password.length || !confirmPassword.length) {
      setErrorMessages((prevMessages) => [
        ...prevMessages,
        "Password is missing",
      ]);
      setIsPasswordValid(false);
      flag = false;
    }
    if (password != confirmPassword) {
      setErrorMessages((prevMessages) => [
        ...prevMessages,
        "Passwords do not match",
      ]);
      setIsPasswordValid(false);
      flag = false;
    }

    return flag;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
  }, [navigate, supabase]);

  const handleSignup = async (e: React.FormEvent) => {
    setErrorMessages([]);
    e.preventDefault();
    if (!validateForm()) return;
    let username = email.slice(0, email.indexOf("@"));
    if (username.length > 16) username = username.slice(0, 16);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
        captchaToken,
      },
    });
    captcha.current.resetCaptcha();
    if (error) {
      setErrorMessages((prevMessages) => [...prevMessages, error.message]);
      return;
    }
    recipient.current = email
    setShow(true)
    clearForm();
  };
  
  return (
    <>
      <div className="flex flex-1 flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-3 sm:mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-neutral-50">
            Create a new account
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white dark:bg-slate-900 dark:border-slate-600 dark:border px-6 py-6 shadow sm:rounded-lg sm:px-12 h-[74vh]">
            <form className="space-y-6" onSubmit={handleSignup}>
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
                    autoComplete="new-password"
                    className={
                      isPasswordValid
                        ? InputStyles.isValid
                        : InputStyles.notValid
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-neutral-50"
                >
                  Re-enter Password
                </label>
                <div className="mt-2">
                  <input
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setIsPasswordValid(true);
                    }}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className={
                      isPasswordValid
                        ? InputStyles.isValid
                        : InputStyles.notValid
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
              <div className="flex justify-center items-center">
                <HCaptcha
                  ref={captcha}
                  sitekey={KEY!}
                  onVerify={setCaptchaToken}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  Sign up
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
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:ring-slate-600 dark:bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 ">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-neutral-50">
                      Just one more step!
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                      Follow the instructions we sent to {recipient.current} to
                      activate your account.
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white dark:bg-slate-900 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
