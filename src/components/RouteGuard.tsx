import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};

const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);

const RouteGuard: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState([]);
  const location = useLocation();
  useEffect(() => {
      supabase.auth.getUser().then(({ data: { user } }: any) => {
        setUser(user);
      });
  }, []);

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
};

export default RouteGuard;
