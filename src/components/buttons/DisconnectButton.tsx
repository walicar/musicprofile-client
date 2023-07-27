import React from "react";
import { useNavigate } from "react-router-dom";

type Prop = {
  service: any;
};

const SpotifyButton: React.FC<Prop> = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // remove from access_token from local storage
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleClick}>disconnect from {service} </button>
    </div>
  );
};

export default SpotifyButton;
