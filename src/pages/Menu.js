import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <div className="menu-buttons">
        <button onClick={() => navigate("/medicare")}>Medicare</button>
        <button onClick={() => navigate("/lifetrack")}>LifeTrack</button>
        <button onClick={() => navigate("/binsight")}>B Insight</button>
        <button onClick={() => navigate("/roommatrix")}>Room Matrix</button>
      </div>
    </div>
  );
};

export default Menu;
