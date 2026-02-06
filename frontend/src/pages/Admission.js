import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import '../styles/Admission.css';
import supabaseService from '../services/supabaseService';

function Admission() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    degreeProgram: '',
    educationLevel: '',
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
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.department) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setSubmitting(true);
      await supabaseService.createAdmission({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        degree_program: formData.degreeProgram,
        education_level: formData.educationLevel,
        message: formData.message,
        created_at: new Date().toISOString(),
        status: 'pending'
      });

      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        degreeProgram: '',
        educationLevel: '',
        message: ''
      });

      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admission-page">
      {/* Hero */}
      <section className="admission-hero">
        <h1>Admission en Ligne</h1>
        <p>Rejoignez l'ISDR/GL et transformez votre avenir</p>
      </section>

      {/* Conditions */}
      <section className="admission-requirements">
        <div className="container">
          <h2>Conditions d'Admission</h2>
          <div className="requirements-grid">
            <div className="requirement-item">
              <FaCheckCircle className="requirement-icon" />
              <h4>Diplôme Requis</h4>
              <p>Baccalauréat ou équivalent reconnu</p>
            </div>
            <div className="requirement-item">
              <FaCheckCircle className="requirement-icon" />
              <h4>Âge Minimum</h4>
              <p>14 ans au moment de l'admission</p>
            </div>
            <div className="requirement-item">
              <FaCheckCircle className="requirement-icon" />
              <h4>Dossiers à Fournir</h4>
              <p>Certificat, relevé des notes, lettre de motivation</p>
            </div>
            <div className="requirement-item">
              <FaCheckCircle className="requirement-icon" />
              <h4>Entretien</h4>
              <p>Entretien académique avec la commission</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="admission-form-section">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Formulaire de Candidature</h2>
              <p>Remplissez tous les champs ci-dessous pour soumettre votre candidature</p>
            </div>

            {submitted && (
              <div className="success-message">
                <FaCheckCircle />
                <h3>Candidature Reçue!</h3>
                <p>Merci pour votre candidature. Nous vous contacterons dans les prochains jours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="admission-form">
              {/* Informations Personnelles */}
              <fieldset className="form-section">
                <legend>Informations Personnelles</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Prénom *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Nom de Famille *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Téléphone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </fieldset>

              {/* Informations Académiques */}
              <fieldset className="form-section">
                <legend>Informations Académiques</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="department">Filière Souhaitée *</label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Sélectionner une filière --</option>
                      <option value="Planification Régionale & Nationale">Planification Régionale & Nationale</option>
                      <option value="Environnement et Développement Durable">Environnement et Développement Durable</option>
                      <option value="Organisation Sociale">Organisation Sociale</option>
                      <option value="Technologie Production Végétale et Animale">Technologie Production Végétale et Animale</option>
                      <option value="Gestion des Entreprises">Gestion des Entreprises</option>
                      <option value="Logistique Humanitaire">Logistique Humanitaire</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="degreeProgram">Niveau d'Études Souhaité</label>
                    <select
                      id="degreeProgram"
                      name="degreeProgram"
                      value={formData.degreeProgram}
                      onChange={handleChange}
                    >
                      <option value="">-- Sélectionner --</option>
                      <option value="Licence">Licence (3 ans)</option>
                      <option value="Master">Master (2 ans)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="educationLevel">Niveau d'Études Actuel</label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Baccalauréat">Baccalauréat</option>
                    <option value="Licence">Licence</option>
                    <option value="Master">Master</option>
                    <option value="Doctorat">Doctorat</option>
                  </select>
                </div>
              </fieldset>

              {/* Message */}
              <fieldset className="form-section">
                <legend>Message Additionnel</legend>
                <div className="form-group">
                  <label htmlFor="message">Pourquoi souhaitez-vous rejoindre l'ISDR/GL?</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Partagez vos motivations et objectifs..."
                  ></textarea>
                </div>
              </fieldset>

              {/* Bouton */}
              <button 
                type="submit" 
                className="btn btn-primary btn-large"
                disabled={submitting}
              >
                {submitting ? 'Envoi en cours...' : 'Soumettre ma Candidature'}
                <FaArrowRight />
              </button>
            </form>

            <p className="form-note">
              * Champs obligatoires. Nous vous contacterons dans les 48 heures après réception de votre candidature.
            </p>
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="admission-steps">
        <div className="container">
          <h2>Processus d'Admission</h2>
          <div className="steps-timeline">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Soumission</h4>
              <p>Remplissez et soumettez le formulaire en ligne</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Vérification</h4>
              <p>Nous vérifions votre dossier et vous contactons</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Entretien</h4>
              <p>Participez à un entretien académique</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h4>Admission</h4>
              <p>Recevez votre lettre d'admission</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admission;
