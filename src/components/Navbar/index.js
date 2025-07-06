import React, { useState, useEffect } from "react";
import "./style.css";
import Logo from "../../assets/logo.png";
import Account from "../../assets/account.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, signout, isLoadingSignout, user } = useAuth();
  const [userName, setUserName] = useState(
    user.name || localStorage.getItem("userName") || "Abdo Zaki"
  );
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem("avatarUrl") || ""
  );

  // تحديث الـ state كل ما يتغير الـ localStorage أو user من AuthContext
  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(user.name || localStorage.getItem("userName") || "Abdo Zaki");
      setAvatarUrl(localStorage.getItem("avatarUrl") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user.name]);

  // Update userName when user data changes
  useEffect(() => {
    setUserName(user.name || localStorage.getItem("userName") || "Abdo Zaki");
  }, [user.name]);

  const handleLogout = () => {
    signout();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
        <span>LexiRead</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/LexiBook">Lexi Books</Link>
        </li>
        <li>
          <Link to="/translate">Translate</Link>
        </li>
        <li>
          <Link to="/wordlist">Word List</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/lexibot">Lexi Bot</Link>
        </li>
        <li>
          <Link to="/memorized">Memorized</Link>
        </li>
        <li>
          <Link to="/mcq">MCQ</Link>
        </li>
      </ul>
      <div className="nav-profile">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="profile-content">
              <img
                src={avatarUrl || Account}
                alt="Profile"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
              <span>{userName}</span>
            </Link>
            <i className="fas fa-chevron-down"></i>
            <button
              onClick={handleLogout}
              disabled={isLoadingSignout}
              style={{
                background: "none",
                border: "none",
                color: "#29436D",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {isLoadingSignout ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <li>
            <Link to="/login" style={{ color: "#29436D" }}>
              Login
            </Link>
          </li>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
