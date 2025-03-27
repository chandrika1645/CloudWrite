import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Editor from "./components/editor";
import getAuthToken from "./util/getAuthUtil";
import { FaPen } from "react-icons/fa";
import "./App.css";
import DraftsList from "./components/Drafts";

function App() {
  const [letter, setLetter] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchLatestDraft = async () => {
      const token = getAuthToken();

      try {
        const response = await fetch(
          `http://localhost:8080/api/drafts/latest`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
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

  const handleSaveLetter = async (content) => {
    setLetter(content);
    if (!userId) {
      alert("You must be logged in to save drafts.");
      return;
    }

    try {
      const token = getAuthToken();

      const response = await fetch("http://localhost:8080/api/drafts/save", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, content }),
      });

      if (response.ok) {
        alert("Draft saved successfully!");
      } else {
        alert("Error saving draft");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="navbar">
        <Login onLogin={setUserId} />
      </div>

      <div className="main-content">
        <div className="drafts-section">
          <h2>Your Recents</h2>
          <DraftsList />
        </div>

        {userId && (
          <button className="pen-button" onClick={() => navigate("/editor")}>
            <FaPen />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
