import React from "react";
import { useNavigate } from "react-router-dom";
type Prop = {
  className: string
}
const LoginButton: React.FC<Prop> = ({className}) => {
  const navigate = useNavigate();
  return (
    <button
      className={className}
      onClick={() => {
        navigate("/login");
      }}
    >
      Log in
    </button>
  );
};

export default LoginButton;
