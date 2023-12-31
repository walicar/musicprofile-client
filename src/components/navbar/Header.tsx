import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoginButton from "@components/buttons/LoginButton";
import SignupButton from "@components/buttons/SignupButton";
import config from "@utils/config";
import useLocalStorageState from "use-local-storage-state";
import LogoutButton from "@components/buttons/LogoutButton";
import ThemeButton from "@components/buttons/ThemeButton";
const ID = config.SUPABASE_ID;

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Settings", href: "/settings" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-slate-900 dark:text-neutral-50 h-[80px]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-5 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 sm">
          <button
            onClick={() => navigate("/")}
            className="-m-1.5 -p-1 h-[55px] w-[55px] visible"
          >
            <span className="sr-only">Musicprofile</span>
            <img src="M.png"/>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink
            key={"home"}
            to={"/"}
            end
            className={`text-sm font-semibold leading-6 text-gray-900 ${
              location.pathname === "/"
                ? "text-orange-500"
                : "text-gray-900 dark:text-neutral-50"
            }`}
          >
            {"Home"}
          </NavLink>
          {session ? (
            navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  location.pathname === item.href
                    ? "text-orange-500"
                    : "text-gray-900 dark:text-neutral-50"
                }`}
              >
                {item.name}
              </NavLink>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <ThemeButton />
          {session ? (
            <LogoutButton className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900 dark:text-neutral-50" />
          ) : (
            <>
              <LoginButton className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900 dark:text-neutral-50" />
              <SignupButton className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm dark:text-neutral-50 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500" />
            </>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-neutral-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center -mt-6 gap-x-6">
            <a href="#" className="-ml-4 mt-3.5 h-[67px] w-[67px] p-1.5">
              <span className="sr-only">Musicprofile </span>
              <img src="M.png"/>
            </a>
            {session ? (
              <LogoutButton onClick={() => setMobileMenuOpen(false)} className="ml-auto rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500a" />
            ) : (
              <>
                <LoginButton onClick={() => setMobileMenuOpen(false)} className="ml-auto rounded-md px-3 py-2 text-sm font-semibold text-gray shadow-sm dark:text-neutral-50 dark:hover:bg-slate-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500a" />
                <SignupButton onClick={() => setMobileMenuOpen(false)} className="ml-auto rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500a" />
              </>
            )}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-neutral-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink
                  key={"Home"}
                  to={"/"}
                  onClick={() => setMobileMenuOpen(false)}
                  end
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-700 ${
                    location.pathname === "/"
                      ? "text-orange-500"
                      : "text-gray-900 dark:text-neutral-50 "
                  }`}
                >
                  {"Home"}
                </NavLink>
                {session ? (
                  navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={(() =>setMobileMenuOpen(false))}
                      end
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-700 ${
                        location.pathname === item.href
                          ? "text-orange-500"
                          : "text-gray-900 dark:text-neutral-50 "
                      }`}
                    >
                      {item.name}
                    </NavLink>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
