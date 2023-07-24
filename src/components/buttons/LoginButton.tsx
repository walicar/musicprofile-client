import React from "react";
import { useNavigate } from "react-router-dom";
const LoginButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => {
        navigate("/login");
      }}>log in</button>
    </div>
  );
};

export default LoginButton;