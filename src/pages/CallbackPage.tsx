import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const CallbackPage: React.FC = () => {
    const { error } = useAuth0();

    if (error) {
        return (
            <div>
                Callback Error
            </div>
        );
    }

    return (
        <div>Put nothing here, just need empty navbar</div>
    );
};
export default CallbackPage;