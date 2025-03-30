import { useEffect, useState } from "react";
import getAuthToken from "../util/getAuthUtil";

const fetchDocs = async () => {
  const token = getAuthToken();

  if (!token) {
    alert("Please log in first!");
    return;
  }

  const response = await fetch("http://localhost:8080/google-drive", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  return data;
};

const UploadedDocs = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetchDocs().then(setDocs);
  }, []);

  return (
    <div>
      <h2>Uploaded Documents</h2>
      <div style={styles.gridContainer}>
        {docs.map((doc) => (
          <div
            key={doc.id}
            style={styles.card}
            onClick={() =>
              window.open(
                `https://docs.google.com/document/d/${doc.id}`,
                "_blank"
              )
            }
          >
            <h3 style={styles.title}>{doc.name}</h3>
            <div style={styles.iframeWrapper}>
              <iframe
                src={`https://docs.google.com/document/d/${doc.id}/preview`}
                title={doc.name}
                style={styles.preview}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    cursor: "pointer",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  preview: {
    width: "1000px",
    height: "1200px",
    border: "none",
    transform: "scale(0.25)",
    transformOrigin: "top left",
    pointerEvents: "none",
  },
  iframeWrapper: {
    width: "100%",
    height: "250px",
    overflow: "hidden",
    position: "relative",
    borderRadius: "8px",
  },
};

export default UploadedDocs;
