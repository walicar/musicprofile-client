import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyButton from "@spotify/SpotifyButton";
import LastfmButton from "@lastfm/LastfmButton";
import useLocalStorageState from "use-local-storage-state";
import DeleteButton from "@components/buttons/DeleteButton";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import UpdateUsernameForm from "@components/forms/UpdateUsernameForm";
import UpdateEmailForm from "@components/forms/UpdateEmailForm";
import UpdatePasswordForm from "@components/forms/UpdatePasswordForm";
import RecoveryForm from "@components/forms/RecoveryForm";
import config from "@utils/config";
const ID = config.SUPABASE_ID;

const SettingsPage: React.FC = () => {
  const [session, setSession] = useLocalStorageState(`sb-${ID}-auth-token`);
  const navigate = useNavigate();
  const [spotify]: any = useLocalStorageState("spotify-token");
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [lastfm]: any = useLocalStorageState("lastfm-token");
  const supabase: SupabaseClient<any> = useSupabaseClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate("/login");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event == "PASSWORD_RECOVERY") {
        setShowRecoveryForm(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, setSession, supabase]);

  if (!session) {
    return <></>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-4 sm:px-6 lg:px-16 shadow-sm ring-1 ring-gray-900/5 dark:ring-slate-600 rounded-md">
      <div className="mx-auto max-w-3xl py-5 space-y-10 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-1 text-gray-900 dark:text-neutral-50 ">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-neutral-400">
            Update your profile information
          </p>
          <dl className="mt-3 space-y-1 divide-y divide-gray-100 dark:divide-slate-500 border-t border-gray-200 dark:border-slate-500 text-sm leading-6">
            <div className="pt-2 pb-1  sm:flex items-center">
              <dt className="font-medium text-gray-900 sm:w-32 sm:flex-none sm:pr-6 dark:text-neutral-50">
                Username
              </dt>
              <dd className="mt-1 flex items-center sm:mt-0 sm:flex-auto">
                <UpdateUsernameForm supabase={supabase} />
              </dd>
            </div>
            <div className="pt-2 pb-1  sm:flex items-center">
              <dt className="font-medium text-gray-900 dark:text-neutral-50 sm:w-32 sm:flex-none sm:pr-6">
                Email address
              </dt>
              <dd className="mt-1 flex items-center sm:mt-0 sm:flex-auto">
                <UpdateEmailForm supabase={supabase} />
              </dd>
            </div>
            <div className="pt-2 pb-1  sm:flex items-center">
              <dt className="font-medium text-gray-900 dark:text-neutral-50 sm:w-32 sm:flex-none sm:pr-6">
                Password
              </dt>
              <dd className="mt-1 flex items-center sm:mt-0 sm:flex-auto">
                <UpdatePasswordForm supabase={supabase} />
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <h2 className="text-base font-semibold leading-1 text-gray-900 dark:text-neutral-50">
            Streaming Platforms
          </h2>
          <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-neutral-400">
            Connect Musicprofile to other streaming platforms.
          </p>
          <ul
            role="list"
            className="mt-3 divide-y divide-gray-100 dark:divide-slate-500 border-t border-gray-200 dark:border-slate-500 text-sm leading-6"
          >
            <li className="flex justify-between gap-x-6 py-3">
              <div className="flex justify-center items-center">
                <span
                  className={`mr-1 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${
                    spotify ? "bg-green-400" : "bg-red-400"
                  }`}
                />

                <div className="font-medium text-gray-900 dark:text-neutral-50">
                  Spotify
                </div>
              </div>
              <SpotifyButton />
            </li>
          </ul>
          <dl className="mt-3 space-y-1 divide-y divide-gray-100 dark:divide-slate-500 border-t border-gray-200 dark:border-slate-500 text-sm leading-6">
            <div className="pt-2 pb-1  sm:flex items-center">
              <dt className="font-medium text-gray-900 sm:w-32 sm:flex-none sm:pr-6 dark:text-neutral-50">
                <div className="flex items-center">
                  <span
                    className={`mr-1 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${
                      lastfm ? "bg-green-400" : "bg-red-400"
                    } `}
                  />
                  <div className="flex-3 font-medium text-gray-900 dark:text-neutral-50">
                    Lastfm
                  </div>
                </div>
              </dt>
              <dd className="mt-1 flex items-center sm:mt-0 sm:flex-auto">
                <LastfmButton />
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-center items-center flex-auto">
          <DeleteButton />
        </div>
        {showRecoveryForm ? <RecoveryForm /> : <></>}
      </div>
    </div>
  );
};

export default SettingsPage;
