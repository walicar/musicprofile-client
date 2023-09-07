import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import InputStyles from "@styles/InputStyles";
//
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, Fragment, useRef } from "react";

type Prop = {
  supabase: SupabaseClient<any>;
};

const UpdateUsernameForm: React.FC<Prop> = ({ supabase }) => {
  const [username, setUsername] = useState<string>("");
  const newUsername = useRef<string>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [show, setShow] = useState(false);

  const isValid = () => {
    return username.length >= 3 && username.length <= 16;
  };

  const updateUsername = async () => {
    if (!isValid()) {
      setIsValidUsername(false);
      setErrorMessage("Username must be between 3 to 16 characters long.");
      return;
    }
    const { error } = await supabase.auth.updateUser({
      data: { username: username },
    });
    if (error) {
      // REMOVE ME
      console.log("updateUsername Error", error);
      setIsValidUsername(false);
      setErrorMessage(error.message);
      return;
    }
    newUsername.current = username;
    setShow(true);
    setUsername("");
  };

  return (
    <>
      <div className="flex items-center justify-center gap-x-3 md:gap-x-6 w-full ">
        <div className="sm:flex-none relative rounded-md shadow-sm">
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            className={
              isValidUsername ? InputStyles.isValid : InputStyles.notValid
            }
            placeholder="My Username"
            onChange={(e) => {
              setUsername(e.target.value);
              setIsValidUsername(true);
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {!isValidUsername ? (
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
          {!isValidUsername ? (
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
        className="font-semibold text-orange-500 hover:text-indigo-500"
        onClick={updateUsername}
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
                      Username changed!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Your username is now {newUsername.current}
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

export default UpdateUsernameForm;
