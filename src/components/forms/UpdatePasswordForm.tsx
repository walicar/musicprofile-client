import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import InputStyles from "@styles/InputStyles";
//
import { SupabaseClient } from "@supabase/supabase-js";
import { Fragment, useState } from "react";

type Prop = {
  supabase: SupabaseClient<any>;
};
const UpdatePasswordForm: React.FC<Prop> = ({ supabase }) => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidNewPassword, setIsValidNewPassword] = useState(true);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const format = (input: string) =>
    input.charAt(0).toUpperCase() + input.slice(1);

  const clearForm = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setIsValidPassword(true);
    setIsValidNewPassword(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setErrorMessage("");
    setIsValidNewPassword(true);
    setIsValidPassword(true);
    e.preventDefault();
    if (!password.length || !newPassword.length || !confirmPassword) {
      setIsValidPassword(false);
      setIsValidNewPassword(false);
      setErrorMessage("Passwords are empty");
      return;
    }
    if (newPassword != confirmPassword) {
      setIsValidNewPassword(false);
      setErrorMessage("Passwords do not match");
      return;
    }
    const { error } = await supabase.rpc("change_user_password", {
      current_plain_password: password,
      new_plain_password: newPassword,
    });
    if (error) {
      setIsValidPassword(false);
      setErrorMessage(format(error.message));
      return;
    }
    setOpen(false);
    setShow(true);
    clearForm();
  };

  return (
    <>
      <div className="flex items-center flex-auto">
        <div className="w-full">
          <input
            type="password"
            name="password"
            id="password"
            value="password"
            disabled
            className="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="button"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
          onClick={() => setOpen(true)}
        >
          Update
        </button>
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
                    <p className="text-sm font-medium text-gray-898">
                      Password Updated
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      You've successfully changed your password.
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen(false);
            clearForm();
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-1 pt-3 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-3">
                  <div>
                    <div className="">
                      <div className="flex justify-between">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 mb-2 text-gray-900"
                        >
                          Update Password
                        </Dialog.Title>
                        <button
                          type="button"
                          className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => {
                            setOpen(false);
                            clearForm();
                          }}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="border-t-2">
                        <form
                          onSubmit={handleSubmit}
                          className="grid grid-rows-5 gap-y-5 py-3 px-7"
                        >
                          <div>
                            <label
                              htmlFor="password"
                              className="text-sm font-semibold"
                            >
                              Current Password
                            </label>
                            <div className="sm:flex-none relative rounded-md shadow-sm">
                              <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                autoComplete="current-password"
                                className={
                                  isValidPassword
                                    ? InputStyles.isValid
                                    : InputStyles.notValid
                                }
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                  setIsValidPassword(true);
                                }}
                              />
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                {!isValidPassword ? (
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
                          <div className="justify-center">
                            {!isValidPassword ? (
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
                          <div>
                            <label
                              htmlFor="newPassword"
                              className="text-sm font-semibold"
                            >
                              New Password
                            </label>
                            <div className="sm:flex-none relative rounded-md shadow-sm">
                              <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={newPassword}
                                autoComplete="new-password"
                                className={InputStyles.isValid}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="text-sm font-semibold"
                            >
                              Re-enter Password
                            </label>
                            <div className="sm:flex-none relative rounded-md shadow-sm">
                              <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                autoComplete="new-password"
                                className={
                                  isValidNewPassword
                                    ? InputStyles.isValid
                                    : InputStyles.notValid
                                }
                                onChange={(e) => {
                                  setConfirmPassword(e.target.value);
                                  setIsValidPassword(true);
                                }}
                              />
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                {!isValidNewPassword ? (
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
                          <div className="justify-center">
                            {!isValidNewPassword ? (
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
                          <button className="font-semibold text-indigo-600 hover:text-indigo-500">
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

export default UpdatePasswordForm;
