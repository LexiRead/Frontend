import React from "react";
import "./style.css";
import Logo from "../../assets/logo.png";
import Account from "../../assets/account.png";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
    <nav className="navbar">
        <div className="logo">
            <img src= {Logo}></img>
            <span>LexiRead</span>
        </div>
        <ul className="nav-links">
            <li><Link to = "/">Home</Link></li>
            <li><Link to = "/translate">Translate</Link></li>
            <li><Link to = "/wordlist">Word List</Link></li>
            <li><Link to = "/community">Community</Link></li>
            <li><Link to = "/lexibot">Lexi Bot</Link></li>
        </ul>
        <div className="nav-profile">
            <div className="profile-content">
                <img src= {Account}></img>
                <span>Abdo Zaki</span>
            </div>
            <i class="fas fa-chevron-down"></i>
        </div>
    </nav>
    );
};
export default Navbar;