import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import getAuthToken from "../util/getAuthUtil";
import "./Styles/Editor.css";
import { getAuth } from "firebase/auth";

const Editor = ({ userId }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { draftId } = useParams();

  useEffect(() => {
    if (draftId) {
      const fetchDraft = async () => {
        try {
          const token = getAuthToken();
          const response = await fetch(
            `http://localhost:8080/api/drafts/${draftId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.ok) {
            const draft = await response.json();
            setTitle(draft.title || "");
            setContent(draft.content);
          }
        } catch (error) {
          console.error("Error loading draft:", error);
        }
      };
      fetchDraft();
    }
  }, [draftId]);

  const handleSave = async () => {
    if (!content.trim()) {
      alert("Letter cannot be empty!");
      return;
    }

    setIsLoading(true);

    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:8080/api/drafts/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          title,
          content,
          draftId: draftId || null,
        }),
      });

      if (response.ok) {
        alert("Draft saved successfully!");
        navigate("/");
      } else {
        alert("Error saving draft");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!draftId) return;

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this draft?"
    );
    if (!isConfirmed) return;

    const token = getAuthToken();
    try {
      const response = await fetch(
        `http://localhost:8080/api/drafts/${draftId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Draft deleted successfully!");
        navigate("/");
      } else {
        alert("Error deleting draft");
      }
    } catch (error) {
      console.error("Error deleting draft:", error);
    }
  };

  const handleUpload = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    setIsUploading(true);

    try {
      const token = getAuthToken();

      const response = await fetch(
        "http://localhost:8080/google-drive/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Uploaded Successfully! View it on Google Drive.");
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("An error occurred while uploading.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{draftId ? "Edit Draft" : "New Draft"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.titleInput}
      />
      <ReactQuill value={content} onChange={setContent} style={styles.editor} />
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={handleSave}
          style={styles.saveButton}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Draft"}
        </button>

        <button
          onClick={handleUpload}
          style={styles.saveButton}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Doc"}
        </button>

        <button
          style={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "900px", margin: "20px auto", padding: "20px" },
  titleInput: { width: "97%", padding: "10px", marginBottom: "10px" },
  editor: { minHeight: "200px", marginBottom: "10px" },
  saveButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  deleteBtn: {
    padding: "10px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default Editor;
