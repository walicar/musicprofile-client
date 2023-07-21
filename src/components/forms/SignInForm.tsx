import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';


const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    const {data, error}: any = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

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
