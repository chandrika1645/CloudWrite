import React, { useState, useEffect } from "react";
import { signInWithGoogle, logout } from "../firebase";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("jwtToken");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      onLogin(parsedUser.uid);
    }
  }, [onLogin]);

  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    if (userData?.token) {
      try {
        const response = await fetch("http://localhost:8080/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: userData.token }),
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          localStorage.setItem("jwtToken", data.jwtToken);
          localStorage.setItem("user", JSON.stringify(data.user)); 
          onLogin(data.user.uid);
        } else {
          console.error("Authentication failed:", data.error);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    onLogin(null);
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
          <button style={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button style={styles.button} onClick={handleLogin}>
          Sign in with Google
        </button>
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
    borderRadius: "8px",
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
};

export default Login;
