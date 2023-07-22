import React from "react";
import PageLayout from "../components/PageLayout";

type Prop = {
  session?: any
}

const HomePage: React.FC<Prop> = ({ session }) => {
  const email = session.user.email;
  return (
    <PageLayout>
      <div>
        <h1>Dashboard</h1>
        <h2>Welcome {email}</h2>
      </div>
    </PageLayout>
  );
};

export default HomePage;
