import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay, FaGraduationCap, FaLightbulb, FaUsers } from 'react-icons/fa';
import '../styles/Home.css';
import supabaseService from '../services/supabaseService';

function Home() {
  const [departments, setDepartments] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Récupérer les départements
        const deptResponse = await supabaseService.getDepartments();
        setDepartments(deptResponse?.slice(0, 3) || []);

        // Récupérer les blogs récents
        const blogsResponse = await supabaseService.getBlogs();
        setBlogs(blogsResponse?.slice(0, 3) || []);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            L'Institut Supérieur de Développement Rural des Grands Lacs
          </h1>
          <p className="hero-subtitle">
            Former les leaders capables d'innover et de répondre aux besoins changeants des zones et des économies rurales dans la région des Grands Lacs
          </p>
          <div className="hero-buttons">
            <Link to="/admission" className="btn btn-primary">
              Postuler Maintenant <FaArrowRight />
            </Link>
            <button className="btn btn-secondary" onClick={() => scrollToVideo()}>
              <FaPlay /> Voir la Vidéo
            </button>
          </div>
        </div>
      </section>

      {/* Vidéo YouTube */}
      <section id="video-section" className="video-section">
        <div className="video-container">
          <h2>Découvrez l'ISDR/GL</h2>
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/B7y-1aXUqIc"
              title="ISDR/GL Présentation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Une Histoire Bâtie sur l'Innovation</h2>
              <p>
                L'ISDR/GL est né de la volonté de créer une institution d'enseignement supérieur axée sur les défis spécifiques du développement des zones rurales de l'Est de la RDC.
              </p>
              <p>
                Fondé pour répondre au besoin criant de cadres capables de concevoir et d'exécuter des projets de développement durable, l'institut a évolué pour devenir un pôle d'excellence reconnu.
              </p>
              <Link to="/about" className="btn btn-outline">
                En Savoir Plus <FaArrowRight />
              </Link>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>20+</h3>
                <p>Années d'Excellence</p>
              </div>
              <div className="stat">
                <h3>6</h3>
                <p>Filières Disponibles</p>
              </div>
              <div className="stat">
                <h3>1000+</h3>
                <p>Diplômés Actifs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filières Principales */}
      <section className="departments-section">
        <div className="container">
          <h2 className="section-title">Nos Filières</h2>
          <p className="section-subtitle">
            Découvrez nos programmes de formation et choisissez votre spécialisation
          </p>
          <div className="departments-grid">
            {departments.length > 0 ? (
              departments.map((dept) => (
                <div key={dept.id} className="department-card">
                  <div className="card-header">
                    <FaGraduationCap className="card-icon" />
                  </div>
                  <h3>{dept.name || 'Département'}</h3>
                  <p>{dept.description?.substring(0, 100)}...</p>
                  <Link 
                    to={`/departments/${dept.slug}`} 
                    className="card-link"
                  >
                    Découvrir <FaArrowRight />
                  </Link>
                </div>
              ))
            ) : (
              <p>Chargement des filières...</p>
            )}
            <div className="department-card departments-cta">
              <h3>Toutes les Filières</h3>
              <Link to="/departments" className="btn btn-primary">
                Voir <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Nos Valeurs Fondamentales</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaUsers className="value-icon" />
              <h3>Engagement</h3>
              <p>Dévouement total au service des communautés rurales.</p>
            </div>
            <div className="value-card">
              <FaLightbulb className="value-icon" />
              <h3>Innovation</h3>
              <p>Recherche constante de solutions nouvelles et adaptées.</p>
            </div>
            <div className="value-card">
              <FaGraduationCap className="value-icon" />
              <h3>Rigueur</h3>
              <p>Excellence dans l'enseignement et la recherche scientifique.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Récent */}
      {blogs.length > 0 && (
        <section className="blog-section">
          <div className="container">
            <h2 className="section-title">Actualités & Blog</h2>
            <div className="blog-grid">
              {blogs.map((blog) => (
                <article key={blog.id} className="blog-card">
                  {blog.image && (
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="blog-image"
                    />
                  )}
                  <div className="blog-content">
                    <span className="blog-category">
                      {blog.category || 'General'}
                    </span>
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt?.substring(0, 100)}...</p>
                    <Link 
                      to={`/blog/${blog.slug}`}
                      className="read-more"
                    >
                      Lire la suite <FaArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="section-cta">
              <Link to="/blog" className="btn btn-primary">
                Voir Tous les Articles <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Prêt à Rejoindre l'ISDR/GL?</h2>
          <p>
            Devenez un leader du développement durable en Afrique centrale
          </p>
          <Link to="/admission" className="btn btn-white">
            Soumettre une Candidature <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

function scrollToVideo() {
  const videoSection = document.getElementById('video-section');
  videoSection?.scrollIntoView({ behavior: 'smooth' });
}

export default Home;
