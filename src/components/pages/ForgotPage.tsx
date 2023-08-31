import React, { useState } from "react";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
const URL = import.meta.env.VITE_CLIENT_URL;

const Styles = {
  isValid:
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  notValid:
    "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6",
};

const ForgotPage: React.FC = () => {
  const supabase: SupabaseClient<any, "public", any> = useSupabaseClient();
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const isValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && isValid(email)) {
      /*
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${URL}/settings`,
      });
      console.log("FORGORT PASSWORD DATA: ", data);
      console.log("FORGORT PASSWORD ERROR: ", error);
      setMessage(`Recovery instructions sent to ${email}`);
      */
    } else {
      setIsValidEmail(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center py-1 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Account Recovery
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleForgot}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                  className={isValidEmail ? Styles.isValid : Styles.notValid}
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
                  Not a valid email address.
                </p>
              ) : (
                <></>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
