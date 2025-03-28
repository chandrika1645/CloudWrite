import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Editor from "./components/editor";
import getAuthToken from "./util/getAuthUtil";
import "./App.css";
import DraftsList from "./components/Drafts";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [letter, setLetter] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const fetchLatestDraft = async () => {
      const token = getAuthToken();

      try {
        const response = await fetch(
          "http://localhost:8080/api/drafts/latest",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.content) {
          setLetter(data.content);
        }
      } catch (error) {
        console.error("Error loading latest draft:", error);
      }
    };

    fetchLatestDraft();
  }, [userId]);

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
                  <Route path="/editor/:draftId" element={<Editor userId={userId} />} />
                  <Route path="/editor" element={<Editor userId={userId} />} />
                  <Route
                    path="/editor/:draftId"
                    element={<Editor userId={userId} />}
                  />
                  <Route path="/recents" element={<DraftsList/>} />

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
