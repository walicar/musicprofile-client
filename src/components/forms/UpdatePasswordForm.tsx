import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

type Prop = {
  supabase: SupabaseClient<any>;
};
const UpdatePasswordForm: React.FC<Prop> = ({ supabase }) => {
  const [password, setPassword] = useState<string>("");
  const updatePassword = async () => {
    if (!password || password.length === 0) console.log("invalid password");
    const { error } = await supabase.auth.updateUser({ password: password });
    if (error) console.log(error);
  };
  return (
    <div className="flex items-center flex-auto">
      <div className="w-full">
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
        onClick={updatePassword}
      >
        Update
      </button>
    </div>
  );
};

export default UpdatePasswordForm;
