import React, { useEffect } from "react";
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
const ID = import.meta.env.VITE_SUPABASE_ID;

const SettingsPage: React.FC = () => {
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [spotify]: any = useLocalStorageState("spotify-token");
  const [lastfm]: any = useLocalStorageState("lastfm-token");
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, []);

  if (!session) {
    return <></>;
  }

  return (
    <>
      {/* <h1>Settings</h1>
        <span>Welcome {session.user.email}</span>
        <h2>Update Account Information</h2>
        <UpdateUserForm />
        <DeleteButton />
        <h2>Streaming Platforms</h2>
        <SpotifyButton />
        <LastfmButton /> */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-16 min-h-[80vh] shadow-sm ring-1 ring-gray-900/5 rounded-md">
        <div className="mx-auto max-w-2xl pt-4 space-y-10 lg:mx-0 lg:max-w-none">
          <div>
            <h2 className="text-base font-semibold leading-1 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-5 text-gray-500">
              Update your profile information
            </p>
            <dl className="mt-3 space-y-1 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <div className="pt-2 pb-1  sm:flex items-center">
                <dt className="font-medium text-gray-900 sm:w-32 sm:flex-none sm:pr-6">
                  Username
                </dt>
                <dd className="mt-1 flex items-center sm:mt-0 sm:flex-auto">
                  <UpdateUsernameForm supabase={supabase} />
                </dd>
              </div>
              <div className="pt-2 pb-1  sm:flex items-center">
                <dt className="font-medium text-gray-900 sm:w-32 sm:flex-none sm:pr-6">
                  Email address
                </dt>
                <dd className="mt-1 flex items-center sm:mt-0 sm:flex-auto">
                  <UpdateEmailForm supabase={supabase} />
                </dd>
              </div>
              <div className="pt-2 pb-1  sm:flex items-center">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Password
                </dt>
                <dd className="mt-1 flex items-center sm:mt-0 sm:flex-auto">
                  <UpdatePasswordForm supabase={supabase} />
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-base font-semibold leading-1 text-gray-900">
              Streaming Platforms
            </h2>
            <p className="mt-1 text-sm leading-5 text-gray-500">
              Connect Musicprofile to other streaming platforms.
            </p>
            <ul
              role="list"
              className="mt-3 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
            >
              <li className="flex justify-between gap-x-6 py-3">
                <div className="flex justify-center items-center">
                  <span
                    className={`mr-1 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                      spotify ? "bg-green-400" : "bg-red-400"
                    }`}
                  />

                  <div className="font-medium text-gray-900">Spotify</div>
                </div>
                <SpotifyButton />
              </li>
              <li className="flex justify-between gap-x-6 py-3">
                <div className="flex justify-center items-center">
                  <span
                    className={`mr-1 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                      lastfm ? "bg-green-400" : "bg-red-400"
                    } `}
                  />
                  <div className="font-medium text-gray-900">Lastfm</div>
                </div>
                <LastfmButton />
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center flex-auto">
            <DeleteButton />
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
