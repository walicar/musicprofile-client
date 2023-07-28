import React from "react";

const StubButton: React.FC = () => {
  const click = async () => {
    console.log("hi");
  };

  return (
    <div>
      <button onClick={click}>send fetch</button>
    </div>
  );
};

export default StubButton;
