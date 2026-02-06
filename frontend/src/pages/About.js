import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTarget, FaEye } from 'react-icons/fa';
import '../styles/About.css';

function About() {
  const [activeTab, setActiveTab] = useState('mission');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about">
      {/* Hero */}
      <section className="about-hero">
        <h1>À Propos de l'ISDR/GL</h1>
        <p>L'excellence académique au service de la transformation rurale</p>
      </section>

      {/* Histoire */}
      <section className="history-section">
        <div className="container">
          <h2>Une Histoire Bâtie sur l'Innovation</h2>
          <div className="history-content">
            <p>
              L'ISDR/GL est né de la volonté de créer une institution d'enseignement supérieur axée sur les défis spécifiques du développement des zones rurales de l'Est de la RDC.
            </p>
            <p>
              Fondé pour répondre au besoin criant de cadres capables de concevoir et d'exécuter des projets de développement durable, l'institut a évolué pour devenir un pôle d'excellence reconnu.
            </p>
            <p>
              Notre approche pédagogique unique combine théorie rigoureuse et pratique intensive sur le terrain, garantissant que nos diplômés sont immédiatement opérationnels.
            </p>
            <p>
              L'Institut est un établissement public d'enseignement supérieur et universitaire, jouissant d'une autonomie de gestion administrative, académique et financière, conformément aux lois de la République Démocratique du Congo.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Valeurs */}
      <section className="mvv-section">
        <div className="container">
          <div className="mvv-tabs">
            <button 
              className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              <FaTarget /> Mission
            </button>
            <button 
              className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
              onClick={() => setActiveTab('vision')}
            >
              <FaEye /> Vision
            </button>
          </div>

          <div className="mvv-content">
            {activeTab === 'mission' && (
              <div className="mvv-card">
                <h3>Notre Mission</h3>
                <p>
                  Former des professionnels de haut niveau, dotés d'une expertise technique solide et d'une éthique irréprochable, capables d'analyser, de planifier et de mettre en œuvre des stratégies de développement rural efficaces et durables pour la région des Grands Lacs et au-delà.
                </p>
              </div>
            )}
            {activeTab === 'vision' && (
              <div className="mvv-card">
                <h3>Notre Vision</h3>
                <p>
                  Être l'établissement de référence en Afrique centrale pour l'enseignement, la recherche et l'innovation en matière de développement rural,contribuant activement à la réduction de la pauvreté et à l'autonomisation des communautés rurales.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="values-detailed-section">
        <div className="container">
          <h2>Nos Valeurs Clés</h2>
          <div className="values-detailed-grid">
            <div className="value-item">
              <div className="value-icon">
                <FaCheckCircle />
              </div>
              <h4>Engagement</h4>
              <p>Dévouement total au service des communautés rurales et au développement durable de la région.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <FaCheckCircle />
              </div>
              <h4>Éthique</h4>
              <p>Respect des principes moraux et de la déontologie professionnelle dans tous nos actes.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <FaCheckCircle />
              </div>
              <h4>Innovation</h4>
              <p>Recherche constante de solutions nouvelles et adaptées aux problèmes émergents.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <FaCheckCircle />
              </div>
              <h4>Rigueur</h4>
              <p>Excellence dans l'enseignement et la recherche scientifique, sans compromis sur la qualité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chronologie */}
      <section className="timeline-section">
        <div className="container">
          <h2>Dates Clés</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2002</div>
              <div className="timeline-content">
                <h4>Fondation de l'Institut Supérieur</h4>
                <p>L'ISDR/GL est fondée pour répondre aux besoins du développement rural dans la région.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2003</div>
              <div className="timeline-content">
                <h4>Reconnaissance Officielle</h4>
                <p>Reconnaissance officielle par le Ministère de l'Enseignement Supérieur et Universitaire.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2010</div>
              <div className="timeline-content">
                <h4>Laboratoire Informatique Moderne</h4>
                <p>Inauguration du Laboratoire Informatique moderne pour la recherche et l'enseignement.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2018</div>
              <div className="timeline-content">
                <h4>Programme de Master</h4>
                <p>Lancement du programme de Master en Développement Rural et Durable.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <div className="timeline-content">
                <h4>Nouvelle Filière Humanitaire</h4>
                <p>Obtention de l'accréditation pour la nouvelle filière Logistique Humanitaire.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="engagement-section">
        <div className="container">
          <h2>Notre Engagement Fondamental</h2>
          <p className="engagement-text">
            Notre action est guidée par une double exigence : l'excellence académique et la pertinence sociétale.
          </p>
          <p className="engagement-text">
            Former les leaders capables d'innover et de répondre aux besoins changeants des zones et des économies rurales dans la région des Grands Lacs.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
