import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Editor from "./components/editor.js";
import "./App.css";
import DraftsList from "./components/Drafts";
import Sidebar from "./components/Sidebar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadedDocs from "./components/Docs.js";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div className="app-container">
      {!userId ? (
        <div className="login-container">
          <img
            className="main-content-1"
            src="https://img.freepik.com/free-vector/blur-pink-blue-abstract-gradient-background-vector_53876-174836.jpg"
            alt="Background"
          />
          <div className="content">
            <h1 className="title">Cloud Write</h1>
            <div className="login-box">
              <Login onLogin={setUserId} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="sidbar">
            <Sidebar />
          </div>
          <div className="main">
            <div className="navbar">
              <Login onLogin={setUserId} />
            </div>
            <div className="main-content">
              <div className="drafts-section">
                <Routes>
                  <Route path="/" element={<DraftsList />} />
                  <Route
                    path="/editor/:draftId"
                    element={<Editor userId={userId} />}
                  />
                  <Route path="/editor" element={<Editor userId={userId} />} />
                  <Route
                    path="/editor/:draftId"
                    element={<Editor userId={userId} />}
                  />
                  <Route path="/recents" element={<DraftsList />} />
                  <Route
                    path="/google-drive/uploads"
                    element={<UploadedDocs />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
