import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getAuthToken from "../util/getAuthUtil";
import "./Styles/Drafts.css";

const DraftsList = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchDrafts = useCallback(async () => {
    const token = getAuthToken();
    try {
      const response = await fetch("http://localhost:8080/api/drafts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDrafts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading drafts:", error);
      setDrafts([]);
    }
  }, []);

  const fetchRecentDrafts = useCallback(async () => {
    const token = getAuthToken();
    try {
      const response = await fetch("http://localhost:8080/api/drafts/latest", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDrafts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading recent drafts:", error);
      setDrafts([]);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/recents") {
      fetchRecentDrafts();
    } else {
      fetchDrafts();
    }
  }, [location.pathname, fetchDrafts, fetchRecentDrafts]);

  return (
    <div className="drafts-container">
      <div className="drafts-header">
        <h2>Your Drafts</h2>
        <button className="new-draft-btn" onClick={() => navigate("/editor")}>
          + New Draft
        </button>
      </div>

      <div className="drafts-grid">
        {drafts.length === 0 ? (
          <p className="no-drafts">No drafts available</p>
        ) : (
          drafts.map((draft) => (
            <div
              key={draft._id}
              className="draft-card"
              onClick={() => navigate(`/editor/${draft._id}`)}
            >
              <h3 className="draft-title">{draft.title || "Untitled Draft"}</h3>
              <p className="draft-preview">
                {draft.content
                  ? new DOMParser()
                      .parseFromString(draft.content, "text/html")
                      .body.textContent.substring(0, 230) + "..."
                  : ""}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DraftsList;
