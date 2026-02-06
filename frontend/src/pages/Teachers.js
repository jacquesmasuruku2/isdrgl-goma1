import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../styles/Teachers.css';
import apiService from '../services/apiService';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getTeachers();
      setTeachers(response?.data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // Données statiques des enseignants
  const defaultTeachers = [
    {
      id: 1,
      name: 'Prof. Dr. Joseph KITAGANYA',
      title: 'Directeur Général',
      qualification: 'Doctorat',
      bio: 'Expert reconnu en planification régionale et développement durable avec plus de 25 ans d\'expérience académique et professionnelle.',
      email: 'kitaganya@isdrgl.org',
      phone: '+243 998401314',
      linkedin: 'https://linkedin.com',
      image: '/images/kitaganya.jpg'
    },
    {
      id: 2,
      name: 'André MUSAVULI',
      title: 'Rectal Académique',
      qualification: 'Doctorat',
      bio: 'Spécialiste en environnement et développement durable. Auteur de nombreuses publications scientifiques dans le domaine de l\'agroécologie.',
      email: 'musavuli@isdrgl.org',
      phone: '+243 998401314',
      linkedin: 'https://linkedin.com',
      image: '/images/musavuli.jpg'
    },
    {
      id: 3,
      name: 'MAFUKO NZAMURATA',
      title: 'Doyen des Études',
      qualification: 'Doctorat',
      bio: 'Chercheur éminent en organisation sociale et mobilisation communautaire. Directeur du centre de recherche en développement rural.',
      email: 'nzamurata@isdrgl.org',
      phone: '+243 998401314',
      linkedin: 'https://linkedin.com',
      image: '/images/nzamurata.jpg'
    },
    {
      id: 4,
      name: 'Jacques SHARO',
      title: 'Chef de Département',
      qualification: 'Doctorat',
      bio: 'Professeur agrégé en production végétale. Pionnier des innovations agricoles adaptées au contexte regional.',
      email: 'sharo@isdrgl.org',
      phone: '+243 998401314',
      linkedin: 'https://linkedin.com',
      image: '/images/sharo.jpg'
    },
    {
      id: 5,
      name: 'KAMALA SENGABO',
      title: 'Coordonnatrice Pédagogique',
      qualification: 'Master',
      bio: 'Experte en gestion de projets éducatifs et innovation pédagogique. Responsable de l\'assurance qualité académique.',
      email: 'sengabo@isdrgl.org',
      phone: '+243 998401314',
      linkedin: 'https://linkedin.com',
      image: '/images/sengabo.jpg'
    },
    {
      id: 6,
      name: 'Claver NDABIJIMANA',
      title: 'Administrateur des Budgets',
      qualification: 'Master',
      bio: 'Gestionnaire financier expérimenté. Responsable de la planification budgétaire et de la gestion des ressources financières de l\'institut.',
      email: 'ndabijimana@isdrgl.org',
      phone: '+243 998401314',
      linkedin: 'https://linkedin.com',
      image: '/images/ndabijimana.jpg'
    },
    {
      id: 7,
      name: 'Maître SAFARI',
      title: 'Responsable du Personnel',
      qualification: 'Licence',
      bio: 'Spécialiste en gestion des ressources humaines. Chargé de la gestion administrative du personnel académique et non-académique.',
      email: 'safari@isdrgl.org',
      phone: '+243 998401314',
      linkedin: 'https://linkedin.com',
      image: '/images/safari.jpg'
    },
    {
      id: 8,
      name: 'Master André AHADI',
      title: 'Responsable des Projets',
      qualification: 'Master',
      bio: 'Chargé des projets de développement et partenariats institutionnels. Coordinateur des programmes de recherche et de coopération.',
      email: 'ahadi@isdrgl.org',
      phone: '+243 998401314',
      linkedin: 'https://linkedin.com',
      image: '/images/ahadi.jpg'
    }
  ];

  const teachersList = teachers.length > 0 ? teachers : defaultTeachers;

  return (
    <div className="teachers-page">
      {/* Hero */}
      <section className="teachers-hero">
        <h1>Corps Académique et Administratif</h1>
        <p>Découvrez l'équipe expérimentée qui dirige et enseigne à l'ISDR/GL</p>
      </section>

      {/* Enseignants */}
      <section className="teachers-section">
        <div className="container">
          {loading ? (
            <div className="loading">Chargement de l'équipe...</div>
          ) : (
            <div className="teachers-grid">
              {teachersList.map(teacher => (
                <div key={teacher.id} className="teacher-card">
                  <div className="teacher-image-wrapper">
                    {teacher.image ? (
                      <img src={teacher.image} alt={teacher.name} className="teacher-image" />
                    ) : (
                      <div className="teacher-image-placeholder">
                        <div className="placeholder-initials">
                          {teacher.name.split(' '.length).map(name => name[0]).join('')}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="teacher-info">
                    <h3 className="teacher-name">{teacher.name}</h3>
                    <p className="teacher-title">{teacher.attributes?.title || teacher.title}</p>
                    <p className="teacher-qualification">
                      {teacher.attributes?.qualification || teacher.qualification}
                    </p>
                    <p className="teacher-bio">
                      {teacher.attributes?.bio || teacher.bio}
                    </p>

                    <div className="teacher-contact">
                      {(teacher.email || teacher.attributes?.email) && (
                        <a href={`mailto:${teacher.attributes?.email || teacher.email}`} className="contact-link" title="Email">
                          <FaEnvelope />
                        </a>
                      )}
                      {(teacher.phone || teacher.attributes?.phone) && (
                        <a href={`tel:${teacher.attributes?.phone || teacher.phone}`} className="contact-link" title="Téléphone">
                          <FaPhone />
                        </a>
                      )}
                      {(teacher.linkedin || teacher.attributes?.linkedin) && (
                        <a href={teacher.attributes?.linkedin || teacher.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link linkedin" title="LinkedIn">
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <div className="container">
          <h2>Voulez-vous Nous Contacter?</h2>
          <p>N'hésitez pas à nous envoyer un message pour plus d'informations</p>
          <a href="mailto:info@isdrgl.org" className="btn btn-primary">
            Envoyer un Email
          </a>
        </div>
      </section>
    </div>
  );
}

export default Teachers;
