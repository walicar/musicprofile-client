import { Transition, Dialog } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import InputStyles from "@styles/InputStyles";
//
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState, Fragment, useRef } from "react";
import useLocalStorageState from "use-local-storage-state";
import testEmail from "@utils/email";
const ID = import.meta.env.VITE_SUPABASE_ID;
type Prop = {
  supabase: SupabaseClient<any>;
};
const UpdateEmailForm: React.FC<Prop> = ({ supabase }) => {
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const newEmail = useRef<string>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const isValid = () => testEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) {
      setIsValidEmail(false);
      setErrorMessage("Invalid email address.");
      return;
    }
    if (confirmEmail != email) {
      setIsValidEmail(false);
      setErrorMessage("Email addresses do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ email: email });
    if (error) {
      setIsValidEmail(false);
      setErrorMessage(error.message);
      return;
    }
    newEmail.current = email;
    setEmail("");
    setConfirmEmail("");
    setOpen(false);
    setShow(true);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-x-3 md:gap-x-6 w-full">
        <div className="sm:flex-none rounded-md shadow-sm">
          <input
            type="text"
            name="email"
            id="email"
            disabled
            className="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 dark:disabled:bg-slate-800 dark:disabled:ring-slate-600"
            placeholder={session.user.email}
          />
        </div>
      </div>
      <button
        type="button"
        className="font-semibold text-orange-500 hover:text-orange-400"
        onClick={() => setOpen(true)}
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
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white  shadow-lg ring-1 ring-black dark:ring-slate-600 dark:bg-slate-900 ring-opacity-5">
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
                      Confirm your new email address!
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                      Follow the instructions we sent to {newEmail.current} to
                      update your email address.
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen(false);
            setEmail("");
            setConfirmEmail("");
            setIsValidEmail(true);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-slate-800 dark:bg-opacity-95" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-900 px-4 pb-1 pt-3 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-3">
                  <div>
                    <div className="">
                      <div className="flex justify-between">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 mb-2 text-gray-900 dark:text-neutral-50"
                        >
                          Update Email Address
                        </Dialog.Title>
                        <button
                          type="button"
                          className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500ark:hover:text-neutral-400 hover:text-gray-500 dark:bg-slate-900 focus:outline-none"
                          onClick={() => {
                            setOpen(false);
                            setEmail("");
                            setConfirmEmail("");
                            setIsValidEmail(true);
                          }}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="border-t-2 dark:border-slate-700">
                        <form
                          onSubmit={handleSubmit}
                          className="grid grid-rows-3 gap-y-5 py-3 px-7"
                        >
                          <div>
                            <label
                              htmlFor="email"
                              className="text-sm font-semibold dark:text-neutral-50"
                            >
                              New Email
                            </label>
                            <div className="sm:flex-none relative rounded-md shadow-sm">
                              <input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                className={
                                  isValidEmail
                                    ? InputStyles.isValid
                                    : InputStyles.notValid
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
                          </div>
                          <div>
                            <label
                              htmlFor="confirmEmail"
                              className="text-sm font-semibold dark:text-neutral-50"
                            >
                              Confirm New Email
                            </label>
                            <div className="sm:flex-none relative rounded-md shadow-sm">
                              <input
                                type="text"
                                name="confirmEmail"
                                id="confirmEmail"
                                value={confirmEmail}
                                className={
                                  isValidEmail
                                    ? InputStyles.isValid
                                    : InputStyles.notValid
                                }
                                placeholder="name@example.com"
                                onChange={(e) => {
                                  setConfirmEmail(e.target.value);
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

                            <div className="mt-3">
                              {!isValidEmail ? (
                                <p
                                  className="text-sm text-red-600"
                                  id="email-error"
                                >
                                  {errorMessage}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <button className="font-semibold text-orange-500 hover:text-orange-400">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UpdateEmailForm;
