import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import '../styles/Blog.css';
import apiService from '../services/apiService';

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
      const response = await apiService.getBlogs(100, 0);
      const blogsList = response?.data || [];
      setBlogs(blogsList);
      
      // Extraire les catégories uniques
      const cats = [...new Set(
        blogsList.map(b => b.attributes?.category?.data?.attributes?.name).filter(Boolean)
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
        blog.attributes?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.attributes?.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog =>
        blog.attributes?.category?.data?.attributes?.name === selectedCategory
      );
    }

    filtered.sort((a, b) => 
      new Date(b.attributes?.publishedAt) - new Date(a.attributes?.publishedAt)
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
                  {blog.attributes?.coverImage?.data?.attributes?.url && (
                    <div className="article-image">
                      <img 
                        src={blog.attributes.coverImage.data.attributes.url}
                        alt={blog.attributes.title}
                      />
                      <span className="article-category">
                        {blog.attributes?.category?.data?.attributes?.name}
                      </span>
                    </div>
                  )}
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="article-date">
                        {formatDate(blog.attributes?.publishedAt)}
                      </span>
                      {blog.attributes?.author?.data && (
                        <span className="article-author">
                          Par {blog.attributes.author.data.attributes.name}
                        </span>
                      )}
                    </div>
                    <h3>{blog.attributes?.title}</h3>
                    <p>{blog.attributes?.excerpt}</p>
                    <Link 
                      to={`/blog/${blog.attributes?.slug}`}
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
