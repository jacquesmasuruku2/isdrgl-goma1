import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">ISDR/GL</span>
          <span className="logo-subtext">L'Éducation Active</span>
        </Link>

        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>
              À Propos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/departments" className="nav-link" onClick={() => setIsOpen(false)}>
              Nos Filières
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/teachers" className="nav-link" onClick={() => setIsOpen(false)}>
              Enseignants
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admission" className="nav-link nav-link-primary" onClick={() => setIsOpen(false)}>
              Admission
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
