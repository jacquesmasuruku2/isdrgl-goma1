import React, { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaYoutube, FaLinkedin, FaSend } from 'react-icons/fa';
import '../styles/Contact.css';
import supabaseService from '../services/supabaseService';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      setSubmitting(true);
      await supabaseService.createContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        created_at: new Date().toISOString(),
        status: 'unread'
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <h1>Nous Contacter</h1>
        <p>Posez-nous vos questions. Nous sommes heureux de vous aider!</p>
      </section>

      {/* Info & Formulaire */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            {/* Informations */}
            <div className="contact-info">
              <h2>Coordonnées</h2>
              
              <div className="info-card">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <h3>Adresse</h3>
                  <p>Goma, Quartier Les Volcans</p>
                  <p>Av. Des Écoles, Derrière CS la Concorde</p>
                  <p>Boîte Postale 376 GOMA, RDC</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-content">
                  <h3>Téléphone</h3>
                  <a href="tel:+243998401314">+243 998 401 314</a>
                  <p className="hours">Lun-Ven: 08:00 - 17:00 GMT+2</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <a href="mailto:info@isdrgl.org">info@isdrgl.org</a>
                  <p><strong>Admissions:</strong> <a href="mailto:admission@isdrgl.org">admission@isdrgl.org</a></p>
                </div>
              </div>

              <h3>Suivez-Nous</h3>
              <div className="social-contact">
                <a href="https://www.facebook.com/isdrgl" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                  <FaFacebook /> Facebook
                </a>
                <a href="https://www.youtube.com/@ISDRGLGoma-zf9dm" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                  <FaYoutube /> YouTube
                </a>
                <a href="https://www.linkedin.com/company/isdr-gl/" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
                  <FaLinkedin /> LinkedIn
                </a>
              </div>
            </div>

            {/* Formulaire de Contact */}
            <div className="contact-form-wrapper">
              <h2>Formulaire de Contact</h2>
              
              {submitted && (
                <div className="success-message">
                  <FaSend />
                  <h3>Message Reçu!</h3>
                  <p>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nom Complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Sujet de votre message"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Votre message..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  <FaSend /> {submitting ? 'Envoi...' : 'Envoyer le Message'}
                </button>
              </form>

              <p className="form-note">
                * Tous les champs sont obligatoires. Nous répondons à tous les messages dans un délai de 24-48 heures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAP (optionnel) */}
      <section className="map-section">
        <h2>Localisation</h2>
        <div className="map-container">
          <iframe
            title="ISDR/GL Localisation"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.3698834848347!2d29.21989!3d-1.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19db6a00000001!2sGoma%2C%20Democratic%20Republic%20of%20the%20Congo!5e0!3m2!1sfr!2s!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Contact;
