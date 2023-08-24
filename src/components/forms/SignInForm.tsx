import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "../contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const supabase: SupabaseClient<any, "public", any> = useSupabaseClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const { data, error }: any = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(error);
    if (!error) {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <button>Forgot Password?</button>
    </div>
  );
};

export default SignInForm;
