import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import '../styles/Blog.css';
import supabaseService from '../services/supabaseService';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await supabaseService.getBlogs();
      const blogsList = response || [];
      setBlogs(blogsList);
      
      // Extraire les catégories uniques
      const cats = [...new Set(
        blogsList.map(b => b.category).filter(Boolean)
      )];
      setCategories(cats);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog =>
        blog.category === selectedCategory
      );
    }

    filtered.sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );

    setFilteredBlogs(filtered);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="blog-page">
      {/* Hero */}
      <section className="blog-hero">
        <h1>Blog et Actualités</h1>
        <p>Découvrez les dernières nouvelles et articles de l'ISDR/GL</p>
      </section>

      {/* Recherche et Filtres */}
      <section className="blog-filter-section">
        <div className="container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              Tous les Articles
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="blog-articles-section">
        <div className="container">
          {loading ? (
            <div className="loading">Chargement des articles...</div>
          ) : filteredBlogs.length > 0 ? (
            <div className="blog-articles-grid">
              {filteredBlogs.map(blog => (
                <article key={blog.id} className="blog-article-card">
                  {blog.image && (
                    <div className="article-image">
                      <img 
                        src={blog.image}
                        alt={blog.title}
                      />
                      <span className="article-category">
                        {blog.category}
                      </span>
                    </div>
                  )}
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="article-date">
                        {formatDate(blog.created_at)}
                      </span>
                    </div>
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
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
          ) : (
            <div className="no-results">
              <p>Aucun article ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
