import React, { Suspense } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

const HomePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 ">
      <div className="relative isolate px-6 py-1 lg:px-8">
        <div className="flex flex-col gap-y-5 md:flex-row pt-8 gap-x-6">
          <div className="flex-5 mx-auto max-w-3xl sm:py-6 lg:py-8">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
            <div className="text-center">
              <div className="sm:h-[359px] sm:-my-[75px]">
                <Suspense fallback={<img src="title_logo.png"/>}>
                  <Spline
                    scene="https://prod.spline.design/9CqLr2SapXc27SAB/scene.splinecode"
                  />
                </Suspense>
              </div>
              <h2>Start tracking your listening history</h2>
              <p className="mt-auto pt-5 text-lg leading-8 text-gray-600 dark:text-neutral-400">
                Create an account to view your top songs, artists, and genres on
                supported streaming platforms!
              </p>
              <p className="mt-3 text-gray-600 dark:text-neutral-400 text-xs">
                Spotify and Lastfm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
