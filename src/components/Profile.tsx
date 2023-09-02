import { FireIcon } from "@heroicons/react/20/solid";
//
import React from "react";
import { useQuery } from "react-query";
import useLocalStorageState from "use-local-storage-state";
import { ProfileWrapper } from "@database/ProfileWrapper";
const ID = import.meta.env.VITE_SUPABASE_ID;

const Profile: React.FC = () => {
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const { data, error, isLoading } = useQuery(
    "profile",
    async () => {
      const profile = new ProfileWrapper(session.access_token, session.user.id);
      try {
        return await profile.getTitle();
      } catch (error: any) {
        throw new Error(error);
      }
    },
    { refetchOnWindowFocus: false }
  );
  const username = !!session.user.user_metadata.username
    ? session.user.user_metadata.username
    : session.user.email;

  if (error) {
    return <span>ERROR: {error as string}</span>;
  }
  if (isLoading) {
    return <span>I'm Loading</span>;
  }

  return (
    <div className="flex py-1 relative">
      <div className="mr-4 flex-shrink-0">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-500">
          <span className="text-xl font-medium leading-none text-white">
            {username.charAt(0).toUpperCase()}
          </span>
        </span>
      </div>
      <div className="py-1 ml-2 flex gap-x-8 justify-center items-center">
        <div>
          <h4 className="text-lg font-bold">{username}</h4>
          <p className="mt-1 italic"> {data}</p>
        </div>
        <div className="flex justify-center items-center">
          <span className="mr-2">5</span>
          <FireIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
