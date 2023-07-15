import React from "react";
import SignupButton from "../buttons/SignupButton";
import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const NavBarButtons: React.FC = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <>
                    <SignupButton />
                    <LoginButton />
                </>
            )}
            <div>We should conditonally </div>
            {isAuthenticated && (
                <>
                    <LogoutButton />
                </>
            )}
        </div>
    );
};

export default NavBarButtons;