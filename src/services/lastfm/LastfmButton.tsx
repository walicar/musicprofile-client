import React from "react";
import { useNavigate } from "react-router-dom";

const LastfmButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("trying to connect to LASTFM");
    navigate("/");
  };

  return (
    <div>
      <button
        className="font-semibold text-indigo-600 hover:text-indigo-500"
        onClick={handleClick}
      >
        Connect
      </button>
    </div>
  );
};

export default LastfmButton;
