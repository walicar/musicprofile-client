import React, { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { useNavigate } from "react-router-dom";
import StubButton from "../components/stubs/StubButton";
import useLocalStorageState from "use-local-storage-state";
const ID = process.env.REACT_APP_SUPABASE_ID;

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession]: any = useLocalStorageState(
    `sb-${ID}-auth-token`,
  );

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, []);

  if (!session) {
    return <></>;
  }

  return (
    <PageLayout>
      <div>
        <h1>Dashboard</h1>
        <h2>Welcome {session.user.email}</h2>
        <StubButton />
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
