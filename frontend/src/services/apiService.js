import axios from 'axios';

// Utiliser le backend Node.js au lieu de Strapi
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // ============ DEPARTMENTS ============
  async getDepartments() {
    try {
      const response = await api.get('/api/departments');
      // Adapter la réponse au format attendu par le frontend
      return {
        data: Array.isArray(response.data) ? response.data : response.data.data || []
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des départements:', error);
      throw error;
    }
  },

  async getDepartmentBySlug(slug) {
    try {
      const response = await api.get('/api/departments');
      const departments = Array.isArray(response.data) ? response.data : response.data.data || [];
      // Trouver le département par slug
      const dept = departments.find(d => (d.slug || d.name?.toLowerCase().replace(/\s+/g, '-')) === slug);
      return dept || null;
    } catch (error) {
      console.error('Erreur lors de la récupération du département:', error);
      throw error;
    }
  },

  // ============ BLOG POSTS ============
  async getBlogs(limit = 10, start = 0) {
    try {
      const response = await api.get('/api/blog');
      const blogs = Array.isArray(response.data) ? response.data : response.data.data || [];
      // Paginer manuellement
      const paginated = blogs.slice(start, start + limit);
      return {
        data: paginated,
        meta: {
          pagination: {
            page: Math.floor(start / limit) + 1,
            pageSize: limit,
            total: blogs.length,
            pageCount: Math.ceil(blogs.length / limit)
          }
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des blogs:', error);
      throw error;
    }
  },

  async getBlogBySlug(slug) {
    try {
      const response = await api.get('/api/blog');
      const blogs = Array.isArray(response.data) ? response.data : response.data.data || [];
      // Trouver le blog par slug
      const blog = blogs.find(b => (b.slug || b.title?.toLowerCase().replace(/\s+/g, '-')) === slug);
      return blog || null;
    } catch (error) {
      console.error('Erreur lors de la récupération du blog:', error);
      throw error;
    }
  },

  // ============ TEACHERS ============
  async getTeachers() {
    try {
      const response = await api.get('/api/teachers');
      return {
        data: Array.isArray(response.data) ? response.data : response.data.data || []
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des enseignants:', error);
      throw error;
    }
  },

  // ============ ADMISSIONS ============
  async createAdmission(admissionData) {
    try {
      const response = await api.post('/api/admissions', admissionData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'admission:', error);
      throw error;
    }
  },

  // ============ CONTACT ============
  async createContact(contactData) {
    try {
      const response = await api.post('/api/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw error;
    }
  },

  // ============ COMMENTS ============
  async addComment(commentData) {
    try {
      // Si le backend n'a pas d'endpoint pour les commentaires, utiliser Supabase directement
      // Pour l'instant, retourner une erreur
      console.warn('L\'endpoint des commentaires n\'existe pas sur le backend');
      throw new Error('Les commentaires ne sont pas disponibles');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      throw error;
    }
  },

  async getComments(blogId) {
    try {
      console.warn('L\'endpoint des commentaires n\'existe pas sur le backend');
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      throw error;
    }
  }
};

export default apiService;
