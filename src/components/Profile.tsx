import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (user === undefined) {
        return <p>BAD</p>
    } else {
        return (
            <div>
                <h2>{user!.name}</h2>
                <p>{user!.email}</p>
                <p>{isAuthenticated}</p>
            </div>
        );
    }
};

export default Profile;