import React from "react";

const Card = ({ children }) => {
  return <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div>{children}</div>;
};

// ✅ Export Both Components
export { Card, CardContent };
