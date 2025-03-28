import React from "react";
import "./Styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className="sidebar">
      {/* New Button */}
      <button className="new-btn" onClick={() => navigate("/editor")}>
        <span>+</span>
        <span>New</span>
      </button>

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        <li>
          📁 <span>My Drive</span>
        </li>
        <li>
          🔄 <span>Recent</span>
        </li>
        <li>
          ⭐ <span>Starred</span>
        </li>
        <li>
          🗑️ <span>Trash</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
