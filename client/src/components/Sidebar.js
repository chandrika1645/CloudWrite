import React from "react";
import "./Styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <button className="new-btn" onClick={() => navigate("/editor")}>
        <span>+</span>
        <span>New</span>
      </button>

      <ul className="sidebar-menu">
        <li onClick={() => navigate("/")}>
          📁 <span>My Drive</span>
        </li>
        <li onClick={() => navigate("/recents")}>
          🔄 <span>Recent</span>
        </li>
        <li onClick={() => navigate("/google-drive/uploads")}>
          ☁️ <span>Uploads</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
