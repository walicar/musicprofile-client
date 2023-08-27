import React, { useState } from "react";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
const ID = import.meta.env.VITE_SUPABASE_ID;
const URL = import.meta.env.VITE_CLIENT_URL;
const ForgotForm: React.FC = () => {
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const isValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submit = async () => {
    if (!email || !isValid(email)) {
      setMessage("Please enter a valid email");
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${URL}/recovery`,
    });
    console.log("FORGOR PASSWORD DATA: ", data);
    console.log("FORGOR PASSWORD ERROR: ", error);
    setMessage(`Recovery instructions sent to ${email}`);
  };

  return (
    <div>
      <h2>Password Recovery</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsValidEmail(true); // Reset validation on input change
            }}
            required
          />
          {!isValidEmail && (
            <p style={{ color: "red" }}>Please enter a valid email.</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotForm;
