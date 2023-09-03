import React from "react";
import { useNavigate } from "react-router-dom";
type Prop = {
  className: string;
};
const SignupButton: React.FC<Prop> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button className={className} onClick={() => navigate("/signup")}>
      Sign Up
    </button>
  );
};

export default SignupButton;
