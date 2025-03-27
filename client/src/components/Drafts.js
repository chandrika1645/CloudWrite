import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import getAuthToken from "../util/getAuthUtil";

const DraftsList = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Drafts</h2>
      <button style={styles.newDraftButton} onClick={() => navigate("/editor")}>
        + New Draft
      </button>

      <div style={styles.draftGrid}>
        {drafts.length === 0 ? (
          <p style={styles.noDrafts}>No drafts available</p>
        ) : (
          drafts.map((draft) => (
            <div key={draft._id} style={styles.card}>
              <h3 style={styles.title}>{draft.title || "Untitled Draft"}</h3>
              <p style={styles.preview}>{draft.content.substring(0, 50)}...</p>
              <div style={styles.actions}>
                <button
                  style={styles.editButton}
                  onClick={() => navigate(`/editor/${draft._id}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    color: "#333",
    marginBottom: "10px",
  },
  newDraftButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  draftGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  preview: {
    fontSize: "14px",
    color: "#666",
  },
  actions: {
    marginTop: "10px",
  },
  editButton: {
    padding: "6px 10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  noDrafts: {
    color: "#888",
    fontStyle: "italic",
  },
};

export default DraftsList;
