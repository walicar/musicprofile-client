import React from "react";
import { useNavigate } from "react-router-dom";
type Prop = {
  className: string;
  onClick?: () => void
};
const SignupButton: React.FC<Prop> = ({ className, onClick }) => {
  const navigate = useNavigate();
  return (
    <button className={className} onClick={() => {
      if (onClick) onClick();
      navigate("/signup")}}>
      Sign Up
    </button>
  );
};

export default SignupButton;
