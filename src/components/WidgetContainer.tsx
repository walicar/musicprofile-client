import SpotifyRecommender from "@services/spotify/SpotifyRecommender";
import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import WidgetSoon from "./WidgetSoon";

const Widgets = [
  {
    id: "spotifyrecommender",
    name: "Spotify Recommendations",
    content: <SpotifyRecommender />,
  },
  {
    id: "spotifyinfo",
    name: "Spotify Track Info",
    content: <WidgetSoon />,
  },
];

const WidgetContainer: React.FC = () => {
  const [widget, setWidget] = useState(Widgets[0]);

  return (
    <div className="h-[440px]">
      <div className="inline-flex py-1 justify-between items-center w-full">
        <h2 className="text-md px-1 font-semibold text-gray-900 dark:text-neutral-50 ">
          Widgets
        </h2>
        <Menu as="div" className="relative inline-block flex-3 text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white dark:bg-slate-700 dark:text-neutral-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50">
              {widget.name}
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-slate-900 dark:text-neutral-50 shadow-lg ring-1 ring-black dark:ring-slate-700 ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {Widgets.map((item) => (
                  <Menu.Item key={item.id}>
                    {({ active }) => (
                      <a
                        id={item.id}
                        className={`${
                          active
                            ? "text-gray-900 dark:text-neutral-50"
                            : "text-gray-700 dark:text-neutral-400"
                        } hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900 block px-4 py-2 text-sm`}
                        onClick={() => {
                          setWidget(item);
                        }}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="border-t-2 dark:border-slate-600 mt-1 pt-2 p-1 overflow-scroll max-h-[400px]">
        {widget.content}
      </div>
    </div>
  );
};
export default WidgetContainer;
