import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button 
      style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", borderRadius: "5px" }} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
