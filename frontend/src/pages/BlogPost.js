import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaSend } from 'react-icons/fa';
import '../styles/BlogPost.css';
import apiService from '../services/apiService';
import supabaseService from '../services/supabaseService';

function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({ name: '', email: '', text: '' });
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogAndComments();
  }, [slug]);

  const fetchBlogAndComments = async () => {
    try {
      setLoading(true);
      const blogData = await apiService.getBlogBySlug(slug);
      setBlog(blogData);

      if (blogData?.id) {
        const commentsData = await supabaseService.getComments(blogData.id);
        setComments(commentsData || []);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.email || !newComment.text) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      setSubmittingComment(true);
      const comment = await supabaseService.addComment({
        blog_id: blog.id,
        name: newComment.name,
        email: newComment.email,
        text: newComment.text,
        created_at: new Date().toISOString(),
      });

      setComments([comment[0], ...comments]);
      setNewComment({ name: '', email: '', text: '' });
      alert('Commentaire ajouté avec succès!');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la soumission du commentaire');
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Chargement de l'article...</div>;
  }

  if (!blog) {
    return (
      <div className="not-found">
        <h2>Article non trouvé</h2>
        <Link to="/blog">Retour au Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-post">
      {/* En-tête */}
      <section className="post-header">
        <div className="container">
          <Link to="/blog" className="back-link">
            <FaArrowLeft /> Retour au Blog
          </Link>
          <h1>{blog.attributes?.title}</h1>
          <div className="post-meta">
            <span className="post-date">
              {formatDate(blog.attributes?.publishedAt)}
            </span>
            {blog.attributes?.author?.data && (
              <span className="post-author">
                Par {blog.attributes.author.data.attributes.name}
              </span>
            )}
            {blog.attributes?.category?.data && (
              <span className="post-category">
                {blog.attributes.category.data.attributes.name}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Image de couverture */}
      {blog.attributes?.coverImage?.data?.attributes?.url && (
        <div className="post-hero-image">
          <img
            src={blog.attributes.coverImage.data.attributes.url}
            alt={blog.attributes.title}
          />
        </div>
      )}

      {/* Contenu */}
      <section className="post-content">
        <div className="container">
          <div className="post-body">
            <article className="post-article">
              <div 
                dangerouslySetInnerHTML={{
                  __html: blog.attributes?.content || blog.attributes?.body || ''
                }}
              />
            </article>

            {/* Sidebar */}
            <aside className="post-sidebar">
              <div className="sidebar-card">
                <h3>À Propos de l'Auteur</h3>
                {blog.attributes?.author?.data?.attributes && (
                  <>
                    <p className="author-name">
                      {blog.attributes.author.data.attributes.name}
                    </p>
                    <p>{blog.attributes.author.data.attributes.bio}</p>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Commentaires */}
      <section className="post-comments-section">
        <div className="container">
          <h2>Commentaires ({comments.length})</h2>

          {/* Formulaire de commentaire */}
          <div className="comment-form-card">
            <h3>Laisser un Commentaire</h3>
            <form onSubmit={handleSubmitComment} className="comment-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={newComment.name}
                  onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  value={newComment.email}
                  onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                  required
                />
              </div>
              <textarea
                placeholder="Votre commentaire..."
                value={newComment.text}
                onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                rows="5"
                required
              ></textarea>
              <button type="submit" className="btn btn-primary" disabled={submittingComment}>
                <FaSend /> {submittingComment ? 'Envoi...' : 'Publier le Commentaire'}
              </button>
            </form>
          </div>

          {/* Liste des commentaires */}
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <h4>{comment.name}</h4>
                    <span className="comment-date">{formatDate(comment.created_at)}</span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">Aucun commentaire pour le moment. Soyez le premier!</p>
            )}
          </div>
        </div>
      </section>

      {/* Articles connexes */}
      <section className="related-posts">
        <div className="container">
          <h2>Articles Connexes</h2>
          <div className="related-posts-grid">
            <Link to="/blog" className="related-post-card">
              <h3>Plus d'Articles</h3>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPost;
