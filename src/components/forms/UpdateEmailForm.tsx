import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import InputStyles from "@styles/InputStyles";
//
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, Fragment, useRef } from "react";
import testEmail from "@utils/email";

type Prop = {
  supabase: SupabaseClient<any>;
};
const UpdateEmailForm: React.FC<Prop> = ({ supabase }) => {
  const [email, setEmail] = useState<string>("");
  const newEmail = useRef<string>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [show, setShow] = useState(false);

  const isValid = () => testEmail(email);

  const updateEmail = async () => {
    if (!isValid()) {
      setIsValidEmail(false);
      setErrorMessage("Invalid email address.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ email: email });
    if (error) {
      // REMOVE ME
      console.log("ERROR Update Email ", error);
      setIsValidEmail(false);
      setErrorMessage(error.message);
      return;
    }
    newEmail.current = email;
    setEmail("");
    setShow(true);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-x-3 md:gap-x-6 w-full">
        <div className="sm:flex-none relative rounded-md shadow-sm">
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            className={
              isValidEmail ? InputStyles.isValid : InputStyles.notValid
            }
            placeholder="name@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsValidEmail(true);
            }}
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
        <div className="pl-3 w-full">
          {!isValidEmail ? (
            <p className="text-sm text-red-600" id="email-error">
              {errorMessage}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <button
        type="button"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
        onClick={updateEmail}
      >
        Update
      </button>
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
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Confirm your new email address!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Follow the instructions we sent to {newEmail.current} to update your email address.
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

export default UpdateEmailForm;
