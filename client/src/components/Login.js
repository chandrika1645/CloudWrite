import React, { useState, useEffect } from "react";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      onLogin(user.uid);
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/auth/profile", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user.uid);
      } else {
        console.log("User not authenticated");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setUser(null);
        localStorage.removeItem("user");
        onLogin(null);
      } else {
        console.error("Authentication failed:", data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

    const scope = [
      "https://www.googleapis.com/auth/drive.file",
      "openid",
      "profile",
      "email",
    ].join(" ");

    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;

    window.location.href = url;
  };

  return (
    <div style={styles.container}>
      {user ? (
        <div style={styles.userInfo}>
          <div style={styles.leftSection}>
            {user.picture && (
              <img
                src={user.picture}
                alt="Profile"
                style={styles.profileImage}
              />
            )}
            <h2 style={styles.heading}>{user.name || "User"}</h2>
          </div>
          <div>
            <button style={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.parentContainer}>
          <button style={styles.loginButton} onClick={handleLogin}>
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "60px",
    padding: "0 20px",
  },
  userInfo: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  parentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  button: {
    padding: "8px 12px",
    marginRight: "15px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    background: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  loginButton: {
    padding: "12px 24px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default Login;
