import React, { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { useNavigate } from "react-router-dom";

type Prop = {
  session?: any;
};

const DashboardPage: React.FC<Prop> = ({ session }) => {
  const navigate = useNavigate();

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
      </div>
    </PageLayout>
  );
};

export default DashboardPage;