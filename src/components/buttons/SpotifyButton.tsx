import React from "react";
import { useNavigate } from "react-router-dom";

const SpotifyButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleClick}>connect to spotify</button>
    </div>
  );
};

export default SpotifyButton;
