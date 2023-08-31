import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

type Prop = {
  supabase: SupabaseClient<any>;
};
const UpdateEmailForm: React.FC<Prop> = ({ supabase }) => {
  const [email, setEmail] = useState<string>("");
  const updateEmail = async () => {
    if (!email || email.length === 0) console.log("invalid email");
    const { error } = await supabase.auth.updateUser({ email: email });
    if (error) console.log(error);
  };
  return (
    <div className="flex gap-x-12 items-center sm:flex-auto">
      <div className="w-full">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
        onClick={updateEmail}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateEmailForm;
