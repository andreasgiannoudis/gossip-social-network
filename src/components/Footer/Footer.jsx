import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logo.png';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
        <a href="/home"><img src={logo} alt="Logo" /></a>
        <p>Η πιο καυτή πλατφόρμα για κουτσομπολιά στη Θεσσαλονίκη.</p>
        </div>

        <div className="footer-center">
          <h3>Γρήγοροι Σύνδεσμοι</h3>
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Αρχική
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Σχετικά
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Επικοινωνία
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Ακολουθήστε μας</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Σουσού. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
