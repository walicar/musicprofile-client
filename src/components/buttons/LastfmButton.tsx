import React from "react";
import { useNavigate } from "react-router-dom";

const LastfmButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleClick}>connect to lastfm</button>
    </div>
  );
};

export default LastfmButton;
