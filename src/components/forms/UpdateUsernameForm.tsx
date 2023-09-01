import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

type Prop = {
  supabase: SupabaseClient<any>;
};

const UpdateUsernameForm: React.FC<Prop> = ({ supabase }) => {
  const [username, setUsername] = useState<string>("");
  const updateUsername = async () => {
    if (!username || username.length === 0) console.log("invalid username");
    const { error } = await supabase.auth.updateUser({
      data: { username: username },
    });
    if (error) console.log(error);
  };
  return (
    <div className="flex gap-x-12 items-center flex-auto">
      <div className="w-full">
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Music Lover"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
        onClick={updateUsername}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateUsernameForm;
