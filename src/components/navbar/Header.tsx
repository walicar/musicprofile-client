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
            className="-m-1.5 p-1.5 invisible lg:visible"
          >
            <span className="sr-only">Musicprofile</span>
            <svg
              width="150"
              height="114"
              viewBox="0 0 150 114"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 fill-orange-500"
            >
              <path d="M150 114H116.4L113.8 51.2C113.4 38.8 112.933 29.4 112.4 23H111.8C110.2 28.0667 108.333 35.9333 106.2 46.6L105.2 51.6L91.4 114H57.8L46.2 57.8L44.2 47.8C41.4 35.4 39.4667 27.1333 38.4 23H37.8C37.2667 29.6667 36.8 40.5333 36.4 55.6C36.2667 56.5333 36.2 58 36.2 60L34.4 114H0.600001L5.4 -1.04904e-05H62.6L72.4 49.2L74.8 62.4C75.8667 58.2667 76.8667 53.6667 77.8 48.6L87 -1.04904e-05H145.4L150 114Z" />
              <path d="M150 114V115H151.041L150.999 113.96L150 114ZM116.4 114L115.401 114.041L115.441 115H116.4V114ZM113.8 51.2L112.8 51.2322L112.801 51.2414L113.8 51.2ZM112.4 23L113.397 22.917L113.32 22H112.4V23ZM111.8 23V22H111.067L110.846 22.6989L111.8 23ZM106.2 46.6L107.181 46.7961L107.181 46.7961L106.2 46.6ZM105.2 51.6L106.176 51.8159L106.179 51.806L106.181 51.7961L105.2 51.6ZM91.4 114V115H92.203L92.3764 114.216L91.4 114ZM57.8 114L56.8206 114.202L56.9853 115H57.8V114ZM46.2 57.8L45.2194 57.9961L45.2206 58.0021L46.2 57.8ZM44.2 47.8L45.1806 47.6039L45.1782 47.5918L45.1754 47.5797L44.2 47.8ZM38.4 23L39.3683 22.7501L39.1747 22H38.4V23ZM37.8 23V22H36.8768L36.8032 22.9203L37.8 23ZM36.4 55.6L37.39 55.7414L37.3981 55.6843L37.3996 55.6265L36.4 55.6ZM36.2 60L37.1994 60.0333L37.2 60.0167V60H36.2ZM34.4 114V115H35.3672L35.3994 114.033L34.4 114ZM0.600001 114L-0.399114 113.958L-0.442991 115H0.600001V114ZM5.4 -1.04904e-05V-1.00001H4.44122L4.40089 -0.0420785L5.4 -1.04904e-05ZM62.6 -1.04904e-05L63.5807 -0.19536L63.4205 -1.00001H62.6V-1.04904e-05ZM72.4 49.2L73.3839 49.0211L73.3824 49.0129L73.3807 49.0047L72.4 49.2ZM74.8 62.4L73.8161 62.5789L75.7683 62.6499L74.8 62.4ZM77.8 48.6L76.8174 48.414L76.8166 48.4188L77.8 48.6ZM87 -1.04904e-05V-1.00001H86.1715L86.0175 -0.186008L87 -1.04904e-05ZM145.4 -1.04904e-05L146.399 -0.0403286L146.36 -1.00001H145.4V-1.04904e-05ZM150 113H116.4V115H150V113ZM117.399 113.959L114.799 51.1586L112.801 51.2414L115.401 114.041L117.399 113.959ZM114.799 51.1678C114.399 38.7633 113.932 29.3429 113.397 22.917L111.403 23.083C111.935 29.4571 112.401 38.8367 112.801 51.2322L114.799 51.1678ZM112.4 22H111.8V24H112.4V22ZM110.846 22.6989C109.229 27.8197 107.354 35.7304 105.219 46.4039L107.181 46.7961C109.313 36.1363 111.171 28.3136 112.754 23.3011L110.846 22.6989ZM105.219 46.4039L104.219 51.4039L106.181 51.7961L107.181 46.7961L105.219 46.4039ZM104.224 51.3841L90.4236 113.784L92.3764 114.216L106.176 51.8159L104.224 51.3841ZM91.4 113H57.8V115H91.4V113ZM58.7794 113.798L47.1794 57.5979L45.2206 58.0021L56.8206 114.202L58.7794 113.798ZM47.1806 57.6039L45.1806 47.6039L43.2194 47.9961L45.2194 57.9961L47.1806 57.6039ZM45.1754 47.5797C42.376 35.1821 40.4394 26.9006 39.3683 22.7501L37.4317 23.2499C38.494 27.366 40.424 35.6179 43.2246 48.0203L45.1754 47.5797ZM38.4 22H37.8V24H38.4V22ZM36.8032 22.9203C36.2676 29.6156 35.8004 40.5054 35.4004 55.5735L37.3996 55.6265C37.7996 40.5613 38.2658 29.7177 38.7968 23.0797L36.8032 22.9203ZM35.4101 55.4586C35.2661 56.4665 35.2 57.9929 35.2 60H37.2C37.2 58.0071 37.2673 56.6002 37.39 55.7414L35.4101 55.4586ZM35.2006 59.9667L33.4006 113.967L35.3994 114.033L37.1994 60.0333L35.2006 59.9667ZM34.4 113H0.600001V115H34.4V113ZM1.59912 114.042L6.39912 0.0420575L4.40089 -0.0420785L-0.399114 113.958L1.59912 114.042ZM5.4 0.99999H62.6V-1.00001H5.4V0.99999ZM61.6193 0.195339L71.4193 49.3953L73.3807 49.0047L63.5807 -0.19536L61.6193 0.195339ZM71.4161 49.3789L73.8161 62.5789L75.7839 62.2211L73.3839 49.0211L71.4161 49.3789ZM75.7683 62.6499C76.8419 58.4898 77.8467 53.8664 78.7835 48.7812L76.8166 48.4188C75.8866 53.467 74.8915 58.0436 73.8317 62.1501L75.7683 62.6499ZM78.7826 48.786L87.9826 0.185987L86.0175 -0.186008L76.8175 48.414L78.7826 48.786ZM87 0.99999H145.4V-1.00001H87V0.99999ZM144.401 0.0403076L149.001 114.04L150.999 113.96L146.399 -0.0403286L144.401 0.0403076Z" />
            </svg>
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
          <div className="flex items-center gap-x-6">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Musicprofile </span>
              <svg
                width="150"
                height="114"
                viewBox="0 0 150 114"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 fill-orange-500"
              >
                <path d="M150 114H116.4L113.8 51.2C113.4 38.8 112.933 29.4 112.4 23H111.8C110.2 28.0667 108.333 35.9333 106.2 46.6L105.2 51.6L91.4 114H57.8L46.2 57.8L44.2 47.8C41.4 35.4 39.4667 27.1333 38.4 23H37.8C37.2667 29.6667 36.8 40.5333 36.4 55.6C36.2667 56.5333 36.2 58 36.2 60L34.4 114H0.600001L5.4 -1.04904e-05H62.6L72.4 49.2L74.8 62.4C75.8667 58.2667 76.8667 53.6667 77.8 48.6L87 -1.04904e-05H145.4L150 114Z" />
                <path d="M150 114V115H151.041L150.999 113.96L150 114ZM116.4 114L115.401 114.041L115.441 115H116.4V114ZM113.8 51.2L112.8 51.2322L112.801 51.2414L113.8 51.2ZM112.4 23L113.397 22.917L113.32 22H112.4V23ZM111.8 23V22H111.067L110.846 22.6989L111.8 23ZM106.2 46.6L107.181 46.7961L107.181 46.7961L106.2 46.6ZM105.2 51.6L106.176 51.8159L106.179 51.806L106.181 51.7961L105.2 51.6ZM91.4 114V115H92.203L92.3764 114.216L91.4 114ZM57.8 114L56.8206 114.202L56.9853 115H57.8V114ZM46.2 57.8L45.2194 57.9961L45.2206 58.0021L46.2 57.8ZM44.2 47.8L45.1806 47.6039L45.1782 47.5918L45.1754 47.5797L44.2 47.8ZM38.4 23L39.3683 22.7501L39.1747 22H38.4V23ZM37.8 23V22H36.8768L36.8032 22.9203L37.8 23ZM36.4 55.6L37.39 55.7414L37.3981 55.6843L37.3996 55.6265L36.4 55.6ZM36.2 60L37.1994 60.0333L37.2 60.0167V60H36.2ZM34.4 114V115H35.3672L35.3994 114.033L34.4 114ZM0.600001 114L-0.399114 113.958L-0.442991 115H0.600001V114ZM5.4 -1.04904e-05V-1.00001H4.44122L4.40089 -0.0420785L5.4 -1.04904e-05ZM62.6 -1.04904e-05L63.5807 -0.19536L63.4205 -1.00001H62.6V-1.04904e-05ZM72.4 49.2L73.3839 49.0211L73.3824 49.0129L73.3807 49.0047L72.4 49.2ZM74.8 62.4L73.8161 62.5789L75.7683 62.6499L74.8 62.4ZM77.8 48.6L76.8174 48.414L76.8166 48.4188L77.8 48.6ZM87 -1.04904e-05V-1.00001H86.1715L86.0175 -0.186008L87 -1.04904e-05ZM145.4 -1.04904e-05L146.399 -0.0403286L146.36 -1.00001H145.4V-1.04904e-05ZM150 113H116.4V115H150V113ZM117.399 113.959L114.799 51.1586L112.801 51.2414L115.401 114.041L117.399 113.959ZM114.799 51.1678C114.399 38.7633 113.932 29.3429 113.397 22.917L111.403 23.083C111.935 29.4571 112.401 38.8367 112.801 51.2322L114.799 51.1678ZM112.4 22H111.8V24H112.4V22ZM110.846 22.6989C109.229 27.8197 107.354 35.7304 105.219 46.4039L107.181 46.7961C109.313 36.1363 111.171 28.3136 112.754 23.3011L110.846 22.6989ZM105.219 46.4039L104.219 51.4039L106.181 51.7961L107.181 46.7961L105.219 46.4039ZM104.224 51.3841L90.4236 113.784L92.3764 114.216L106.176 51.8159L104.224 51.3841ZM91.4 113H57.8V115H91.4V113ZM58.7794 113.798L47.1794 57.5979L45.2206 58.0021L56.8206 114.202L58.7794 113.798ZM47.1806 57.6039L45.1806 47.6039L43.2194 47.9961L45.2194 57.9961L47.1806 57.6039ZM45.1754 47.5797C42.376 35.1821 40.4394 26.9006 39.3683 22.7501L37.4317 23.2499C38.494 27.366 40.424 35.6179 43.2246 48.0203L45.1754 47.5797ZM38.4 22H37.8V24H38.4V22ZM36.8032 22.9203C36.2676 29.6156 35.8004 40.5054 35.4004 55.5735L37.3996 55.6265C37.7996 40.5613 38.2658 29.7177 38.7968 23.0797L36.8032 22.9203ZM35.4101 55.4586C35.2661 56.4665 35.2 57.9929 35.2 60H37.2C37.2 58.0071 37.2673 56.6002 37.39 55.7414L35.4101 55.4586ZM35.2006 59.9667L33.4006 113.967L35.3994 114.033L37.1994 60.0333L35.2006 59.9667ZM34.4 113H0.600001V115H34.4V113ZM1.59912 114.042L6.39912 0.0420575L4.40089 -0.0420785L-0.399114 113.958L1.59912 114.042ZM5.4 0.99999H62.6V-1.00001H5.4V0.99999ZM61.6193 0.195339L71.4193 49.3953L73.3807 49.0047L63.5807 -0.19536L61.6193 0.195339ZM71.4161 49.3789L73.8161 62.5789L75.7839 62.2211L73.3839 49.0211L71.4161 49.3789ZM75.7683 62.6499C76.8419 58.4898 77.8467 53.8664 78.7835 48.7812L76.8166 48.4188C75.8866 53.467 74.8915 58.0436 73.8317 62.1501L75.7683 62.6499ZM78.7826 48.786L87.9826 0.185987L86.0175 -0.186008L76.8175 48.414L78.7826 48.786ZM87 0.99999H145.4V-1.00001H87V0.99999ZM144.401 0.0403076L149.001 114.04L150.999 113.96L146.399 -0.0403286L144.401 0.0403076Z" />
              </svg>
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
