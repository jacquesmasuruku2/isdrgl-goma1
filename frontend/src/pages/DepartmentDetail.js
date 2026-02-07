import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/DepartmentDetail.css';
import supabaseService from '../services/supabaseService';

function DepartmentDetail() {
  const { slug } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDepartment();
  }, [slug]);

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      const response = await supabaseService.getDepartmentBySlug(slug);
      setDepartment(response);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // Données par défaut si Strapi n'est pas disponible
  const departmentDetails = {
    'planification-regionale-nationale': {
      name: 'Planification Régionale & Nationale',
      description: 'Formation complète en planification et politique de développement régional.',
      content: `
        <h2>Aperçu du Programme</h2>
        <p>
          Ce programme forme des experts en planification stratégique et politique de développement capable de contribuer 
          à la définition et mis en œuvre des politiques régionales et nationales de développement.
        </p>
        <h3>Objectifs du Programme</h3>
        <ul>
          <li>Maîtriser les outils et méthodes de planification stratégique</li>
          <li>Comprendre la macro-économie et la politique fiscale</li>
          <li>Développer des capacités d'analyse et de diagnostic territorial</li>
          <li>Former des cadres capables de concevoir des plans de développement</li>
        </ul>
        <h3>Domaines d'Étude</h3>
        <ul>
          <li>Planification Stratégique Régionale</li>
          <li>Économie du Développement</li>
          <li>Analytique de Données pour la Planification</li>
          <li>Politiques Publiques et Gouvernance</li>
          <li>Gestion de Projets de Grande Envergure</li>
        </ul>
      `
    },
    'environnement-developpement-durable': {
      name: 'Environnement et Développement Durable',
      description: 'Expertise en gestion environnementale et développement écologique responsable.',
      content: `
        <h2>Aperçu du Programme</h2>
        <p>
          Ce programme forme des spécialistes en gestion environnementale et développement durable, capables 
          de concevoir des solutions écologiquement responsables pour le développement rural.
        </p>
        <h3>Objectifs du Programme</h3>
        <ul>
          <li>Comprendre les enjeux environnementaux en zones rurales</li>
          <li>Maîtriser les techniques d'agriculture durable</li>
          <li>Former des experts en gestion des ressources naturelles</li>
          <li>Développer des solutions d'adaptation au changement climatique</li>
        </ul>
        <h3>Domaines d'Étude</h3>
        <ul>
          <li>Écologie et Biodiversité</li>
          <li>Agriculture Durable et Agroforesterie</li>
          <li>Gestion des Ressources Naturelles</li>
          <li>Changement Climatique et Adaptation</li>
          <li>Énergie Renouvelable en Zones Rurales</li>
        </ul>
      `
    },
    'organisation-sociale': {
      name: 'Organisation Sociale',
      description: 'Comprendre et mobiliser les structures sociales pour le développement communautaire.',
      content: `
        <h2>Aperçu du Programme</h2>
        <p>
          Ce programme prépare des professionnels à mobiliser les ressources sociales et communautaires 
          pour promouvoir le développement endogène et la cohésion sociale en zones rurales.
        </p>
        <h3>Objectifs du Programme</h3>
        <ul>
          <li>Comprendre les dynamiques sociales et culturelles</li>
          <li>Développer des compétences en mobilisation communautaire</li>
          <li>Former des experts en développement social et humain</li>
          <li>Maîtriser les techniques d'animation rurale</li>
        </ul>
        <h3>Domaines d'Étude</h3>
        <ul>
          <li>Sociologie Rurale</li>
          <li>Mobilisation Communautaire</li>
          <li>Leadership et Gestion Participative</li>
          <li>Développement Social et Humain</li>
          <li>Animation et Éducation Populaire</li>
        </ul>
      `
    },
    'technologie-production': {
      name: 'Technologie Production Végétale et Animale',
      description: 'Innovations technologiques pour l\'agro-alimentaire et l\'élevage modernes.',
      content: `
        <h2>Aperçu du Programme</h2>
        <p>
          Ce programme forme des experts techniques en production agricole et animale, capables 
          d'appliquer les innovations technologiques pour augmenter la productivité et la qualité.
        </p>
        <h3>Objectifs du Programme</h3>
        <ul>
          <li>Maîtriser les techniques modernes de production agricole</li>
          <li>Développer les compétences en élevage intensif et extensif</li>
          <li>Former des experts en transformation agro-alimentaire</li>
          <li>Appliquer l'innovation technologique en agriculture</li>
        </ul>
        <h3>Domaines d'Étude</h3>
        <ul>
          <li>Agronomie Générale et Spécialisée</li>
          <li>Production Animale et Zootechnie</li>
          <li>Technologie Agro-alimentaire</li>
          <li>Irrigation et Gestion de l'Eau</li>
          <li>Protection des Cultures</li>
        </ul>
      `
    },
    'gestion-entreprises': {
      name: 'Gestion des Entreprises',
      description: 'Compétences entrepreneuriales et management pour l\'économie rurale.',
      content: `
        <h2>Aperçu du Programme</h2>
        <p>
          Ce programme prépare des entrepreneurs et gestionnaires capables de créer, développer 
          et gérer des entreprises rentables et durables en zones rurales.
        </p>
        <h3>Objectifs du Programme</h3>
        <ul>
          <li>Développer l'esprit entrepreneurial dans le contexte rural</li>
          <li>Maîtriser les principes de gestion d'entreprise</li>
          <li>Former des cadres en finance et comptabilité paysanne</li>
          <li>Développer les compétences en marketing et commercialisation</li>
        </ul>
        <h3>Domaines d'Étude</h3>
        <ul>
          <li>Entrepreneuriat Rural</li>
          <li>Gestion d'Entreprise</li>
          <li>Finance et Comptabilité</li>
          <li>Marketing et Commercialisation</li>
          <li>Coopératives et Associations</li>
        </ul>
      `
    },
    'logistique-humanitaire': {
      name: 'Logistique Humanitaire',
      description: 'Spécialisation nouvelle en logistique et gestion de crise humanitaire.',
      content: `
        <h2>Aperçu du Programme</h2>
        <p>
          Ce programme nouveau prépare des spécialistes en logistique humanitaire et gestion de crise, 
          capables de coordonner les opérations de secours et de développement en contextes précaires.
        </p>
        <h3>Objectifs du Programme</h3>
        <ul>
          <li>Maîtriser la chaîne d'approvisionnement humanitaire</li>
          <li>Développer les compétences en gestion de crise</li>
          <li>Former des experts en coordination d'urgence</li>
          <li>Comprendre les enjeux humanitaires contemporains</li>
        </ul>
        <h3>Domaines d'Étude</h3>
        <ul>
          <li>Logistique Humanitaire</li>
          <li>Gestion de Crise et d'Urgence</li>
          <li>Coordination d'Opérations</li>
          <li>Protection et Droits Humains</li>
          <li>Evaluation et Monitoring des Projets</li>
        </ul>
      `
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  const deptData = department || departmentDetails[slug];

  if (!deptData) {
    return (
      <div className="not-found">
        <h2>Département non trouvé</h2>
        <Link to="/departments">Retour aux Filières</Link>
      </div>
    );
  }

  return (
    <div className="department-detail">
      {/* Hero */}
      <section className="detail-hero">
        <div className="detail-hero-content">
          <Link to="/departments" className="back-link">
            <FaArrowLeft /> Retour aux Filières
          </Link>
          <h1>{deptData.name}</h1>
          <p>{deptData.description}</p>
        </div>
      </section>

      {/* Contenu Principal */}
      <section className="detail-content">
        <div className="container">
          <div className="detail-body">
            <div className="detail-text">
              <div 
                dangerouslySetInnerHTML={{
                  __html: deptData.content || ''
                }}
              />
            </div>
            <aside className="detail-sidebar">
              <div className="sidebar-card">
                <h3>Informations du Programme</h3>
                <div className="info-item">
                  <label>Durée</label>
                  <p>2 à 4 ans</p>
                </div>
                <div className="info-item">
                  <label>Diplôme Décerné</label>
                  <p>Licence / Master</p>
                </div>
                <div className="info-item">
                  <label>Niveau d'Étude Requis</label>
                  <p>Baccalauréat</p>
                </div>
                <div className="info-item">
                  <label>Mode de Formation</label>
                  <p>Présentiel + Stage</p>
                </div>
              </div>

              <div className="sidebar-card cta-card">
                <h3>Prêt à Vous Inscrire?</h3>
                <p>Rejoignez notre programme de formation</p>
                <Link to="/admission" className="btn btn-primary btn-block">
                  Soumettre une Candidature
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Autres Filières */}
      <section className="related-departments">
        <div className="container">
          <h2>Autres Filières</h2>
          <div className="related-grid">
            {/* Afficher 3 autres filières */}
            {Object.keys(departmentDetails)
              .filter(key => key !== slug)
              .slice(0, 3)
              .map(key => (
                <div key={key} className="related-card">
                  <h4>{departmentDetails[key].name}</h4>
                  <Link to={`/departments/${key}`} className="related-link">
                    Découvrir <FaArrowRight />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DepartmentDetail;
