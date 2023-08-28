import React, { useState } from "react";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { type SupabaseClient } from "@supabase/supabase-js";

const UpdateUserForm: React.FC = () => {
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const updateUsername = async () => {
    console.log("handle updating user");
  };
  const updateEmail = async () => {
    const {data, error} = await supabase.auth.updateUser({email: email});
    console.log("UpdateEmail Data", data)
    console.log("UpdateEmail Err", error)
  };
  const updatePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({password: password});
    console.log("UpdateEmail Data", data)
    console.log("UpdateEmail Err", error)

  };

  return (
    <>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <button onClick={updateUsername}>Change Username</button>
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button onClick={updateEmail}>Change Email</button>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={updatePassword}>Change Password</button>
      </div>
    </>
  );
};

export default UpdateUserForm;