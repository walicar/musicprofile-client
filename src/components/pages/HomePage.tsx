import {
  UserCircleIcon,
  MusicalNoteIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";

const items = [
  {
    id: "about1",
    title: "Get insights from your personal leaderboard",
    content: "Visit daily to see how your music taste changes!",
    icon: <ArrowTrendingUpIcon className="h-8 w-8" />,
  },
  {
    id: "about2",
    title: "Share your taste with customized cards",
    content: "Show your friends what you've been listening to!",
    icon: <UserCircleIcon className="h-8 w-8" />,
  },
  {
    id: "about3",
    title: "Interact with widgets",
    content:
      "Get new song recommendations, or look at the statistics of a song!",
    icon: <MusicalNoteIcon className="h-8 w-8" />,
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 ">
      <div className="relative isolate px-6 py-1 lg:px-8">
        <div className="flex flex-col gap-y-5 sm:flex-row pt-16 gap-x-6">
          <div className="flex-5 mx-auto max-w-2xl sm:py-12 lg:py-20">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-neutral-50 sm:text-6xl">
                Start tracking your listening history
              </h1>
              <p className="mt-auto pt-10 text-lg leading-8 text-gray-600 dark:text-neutral-400">
                Create an account to view your top songs, artists, and genres on
                each streaming platform!
              </p>
            </div>
          </div>
          <div className="max-w-lg px-4 m:px-6 lg:px-8">
            <h2 className="text-2xl pt-5 font-bold leading-1 text-gray-900 dark:text-neutral-50 flex justify-center">
              <div>Join now!</div>
            </h2>
            <div className="pt-7">
              <div className="overflow-hidden rounded-md bg-gray-100 dark:bg-slate-800 shadow">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-slate-600"
                >
                  {items.map((item) => (
                    <li key={item.id} className="px-6 py-4 ">
                      <div className="inline-flex font-semibold text-lg">
                        <span className="mr-3 text-indigo-600">
                          {" "}
                          {item.icon}
                        </span>
                        {item.title}
                      </div>
                      <div className="text-md text-gray-600 dark:text-neutral-400">
                        {item.content}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
