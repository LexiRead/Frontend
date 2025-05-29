import React from "react";
import "./style.css";
import Logo from "../../assets/logo.png";
import Account from "../../assets/account.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
        <span>LexiRead</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/translate">Translate</Link></li>
        <li><Link to="/wordlist">Word List</Link></li>
        <li><Link to="/community">Community</Link></li>
        <li><Link to="/lexibot">Lexi Bot</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/ocr">OCR</Link></li>
      </ul>
      <div className="nav-profile">
        <Link to="/profile" className="profile-content">
          <img src={Account} alt="Profile" />
          <span>Abdo Zaki</span>
        </Link>
        <i className="fas fa-chevron-down"></i>
      </div>
    </nav>
  );
};

export default Navbar;