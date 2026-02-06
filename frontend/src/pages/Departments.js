import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBook } from 'react-icons/fa';
import '../styles/Departments.css';
import apiService from '../services/apiService';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDepartments();
      setDepartments(response?.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des départements:', error);
    } finally {
      setLoading(false);
    }
  };

  // Données statiques pour les 6 filières principales
  const defaultDepartments = [
    {
      id: 1,
      name: "Planification Régionale & Nationale",
      slug: "planification-regionale-nationale",
      description: "Formation complète en planification et politique de développement régional.",
      details: "Maîtrise des outils de planification stratégique et de gestion macro-économique pour une contribution efficace au développement national et régional."
    },
    {
      id: 2,
      name: "Environnement et Développement Durable",
      slug: "environnement-developpement-durable",
      description: "Expertise en gestion environnementale et développement écologique responsable.",
      details: "Formation approfondie en conservation de l'environnement, agriculture durable et gestion des ressources naturelles."
    },
    {
      id: 3,
      name: "Organisation Sociale",
      slug: "organisation-sociale",
      description: "Comprendre et mobiliser les structures sociales pour le développement communautaire.",
      details: "Développement des compétences en sociologie, mobilisation communautaire et organisation des populations locales."
    },
    {
      id: 4,
      name: "Technologie Production Végétale et Animale",
      slug: "technologie-production",
      description: "Innovations technologiques pour l'agro-alimentaire et l'élevage modernes.",
      details: "Maîtrise des techniques modernes de production agricole et animale adaptées à l'Afrique subsaharienne."
    },
    {
      id: 5,
      name: "Gestion des Entreprises",
      slug: "gestion-entreprises",
      description: "Compétences entrepreneuriales et management pour l'économie rurale.",
      details: "Formation en gestion entrepreneuriale, marketing digital et gestion de projets d'entreprise en milieu rural."
    },
    {
      id: 6,
      name: "Logistique Humanitaire",
      slug: "logistique-humanitaire",
      description: "Spécialisation nouvelle en logistique et gestion de crise humanitaire.",
      details: "Formation en chaîne d'approvisionnement, gestion de projets humanitaires et coordination d'urgence."
    }
  ];

  const deptList = departments.length > 0 ? departments : defaultDepartments;

  return (
    <div className="departments-page">
      {/* Hero */}
      <section className="departments-hero">
        <h1>Nos Filières de Formation</h1>
        <p>Découvrez nos 6 filières principales et choisissez votre spécialisation</p>
      </section>

      {/* Filières */}
      <section className="departments-list-section">
        <div className="container">
          {loading ? (
            <div className="loading">Chargement des filières...</div>
          ) : (
            <div className="departments-full-grid">
              {deptList.map((dept) => (
                <div key={dept.id} className="department-full-card">
                  <div className="dept-header">
                    <div className="dept-icon">
                      <FaBook />
                    </div>
                    <h3>{dept.attributes?.name || dept.name}</h3>
                  </div>
                  <p className="dept-description">
                    {dept.attributes?.description || dept.description}
                  </p>
                  <div className="dept-details">
                    <p>{dept.attributes?.details || dept.details}</p>
                  </div>
                  {dept.attributes?.programs?.data && (
                    <div className="dept-programs">
                      <h4>Programmes Disponibles:</h4>
                      <ul>
                        {dept.attributes.programs.data.map((prog) => (
                          <li key={prog.id}>{prog.attributes.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Link 
                    to={`/departments/${dept.attributes?.slug || dept.slug}`}
                    className="btn btn-secondary"
                  >
                    Détails Complets <FaArrowRight />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Admissions CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Prêt à Postuler?</h2>
          <p>Ouvrez les portes de votre avenir avec l'ISDR/GL</p>
          <Link to="/admission" className="btn btn-white">
            Soumettre une Candidature <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Departments;
