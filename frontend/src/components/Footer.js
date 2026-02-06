import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* À Propos */}
          <div className="footer-section">
            <h3>ISDR/GL</h3>
            <p>
              Institut Supérieur de Développement Rural des Grands Lacs.
              Formant l'élite du développement rural depuis plus de deux décennies.
            </p>
          </div>

          {/* Liens Rapides */}
          <div className="footer-section">
            <h4>Liens Rapides</h4>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/about">À Propos</Link></li>
              <li><Link to="/departments">Nos Filières</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/teachers">Enseignants</Link></li>
              <li><Link to="/admission">Admission</Link></li>
            </ul>
          </div>

          {/* Localisation */}
          <div className="footer-section">
            <h4>Localisation</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <p>Goma, Quartier Les Volcans</p>
                  <p>Av. Des Écoles, Derrière CS la Concorde</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:+243998401314">+243 998401314</a>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:info@isdrgl.org">info@isdrgl.org</a>
              </div>
            </div>
          </div>

          {/* Réseaux Sociaux */}
          <div className="footer-section">
            <h4>Suivez-Nous</h4>
            <div className="social-links">
              <a 
                href="https://www.facebook.com/isdrgl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link facebook"
                title="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.youtube.com/@ISDRGLGoma-zf9dm" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link youtube"
                title="YouTube"
              >
                <FaYoutube />
              </a>
              <a 
                href="https://www.linkedin.com/company/isdr-gl/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link linkedin"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} ISDR/GL - Tous droits réservés. B.P 376 GOMA.</p>
          <p>Designed By Jacques Masuruku</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
