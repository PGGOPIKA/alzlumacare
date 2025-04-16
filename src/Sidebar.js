import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>AlzLumaCare</h3>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
