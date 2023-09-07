import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import InputStyles from "@styles/InputStyles";
//
import React, { useState, Fragment, useRef } from "react";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import testEmail from "@utils/email";
const URL = import.meta.env.VITE_CLIENT_URL;

const ForgotPage: React.FC = () => {
  const supabase: SupabaseClient<any, "public", any> = useSupabaseClient();
  const recipient = useRef<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const isValid = () => testEmail(email);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) {
      setIsValidEmail(false);
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${URL}/settings`,
    });
    if (error) {
      setIsValidEmail(false);
      setErrorMessage(error.message);
      return;
    }
    recipient.current = email;
    setShow(true);
    setEmail("");
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-center py-1 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-3 sm:mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-neutral-50">
            Account Recovery
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white dark:bg-slate-900 dark:border-slate-600 dark:border px-6 py-8 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-3" onSubmit={handleForgot}>
              <div className="w-full sm:h-24">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-neutral-50"
                >
                  Email address
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsValidEmail(true);
                    }}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className={
                      isValidEmail ? InputStyles.isValid : InputStyles.notValid
                    }
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {!isValidEmail ? (
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                {!isValidEmail ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {errorMessage}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
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
                      Recover your account!
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                      Follow the instructions we sent to {recipient.current} to
                      recover your account.
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

export default ForgotPage;
