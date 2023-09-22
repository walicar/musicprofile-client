
const HomePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 ">
      <div className="relative isolate px-6 py-1 lg:px-8">
        <div className="flex flex-col gap-y-5 md:flex-row pt-16 gap-x-6">
          <div className="flex-5 mx-auto max-w-2xl sm:py-12 lg:py-20">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-neutral-50 sm:text-6xl">
                Start tracking your listening history
              </h1>
              <p className="mt-auto pt-10 text-lg leading-8 text-gray-600 dark:text-neutral-400">
                Create an account to view your top songs, artists, and genres on
                supported streaming platforms!
              </p>
              <p className="mt-3 text-gray-600 dark:text-neutral-400 text-xs">Spotify and Lastfm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
