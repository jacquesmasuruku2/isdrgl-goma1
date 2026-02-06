import axios from 'axios';

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utilitaire pour construire les URL Strapi avec population
const buildStrapiQuery = (populate = '*') => {
  return `?populate=${populate}`;
};

export const strapiService = {
  // Pages
  getPages: async () => {
    try {
      const response = await api.get(`/api/pages${buildStrapiQuery()}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des pages:', error);
      throw error;
    }
  },

  getPageBySlug: async (slug) => {
    try {
      const response = await api.get(`/api/pages?filters[slug][$eq]=${slug}${buildStrapiQuery()}`);
      return response.data?.data?.[0] || null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la page:', error);
      throw error;
    }
  },

  // Blogs
  getBlogs: async (limit = 10, start = 0) => {
    try {
      const response = await api.get(
        `/api/blogs?sort[0]=publishedAt:desc&pagination[limit]=${limit}&pagination[start]=${start}${buildStrapiQuery('author,category')}`
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des blogs:', error);
      throw error;
    }
  },

  getBlogBySlug: async (slug) => {
    try {
      const response = await api.get(
        `/api/blogs?filters[slug][$eq]=${slug}${buildStrapiQuery('author,category,comments')}`
      );
      return response.data?.data?.[0] || null;
    } catch (error) {
      console.error('Erreur lors de la récupération du blog:', error);
      throw error;
    }
  },

  // Départements
  getDepartments: async () => {
    try {
      const response = await api.get(`/api/departments${buildStrapiQuery('programs')}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des départements:', error);
      throw error;
    }
  },

  getDepartmentBySlug: async (slug) => {
    try {
      const response = await api.get(
        `/api/departments?filters[slug][$eq]=${slug}${buildStrapiQuery('programs')}`
      );
      return response.data?.data?.[0] || null;
    } catch (error) {
      console.error('Erreur lors de la récupération du département:', error);
      throw error;
    }
  },

  // Enseignants
  getTeachers: async () => {
    try {
      const response = await api.get(`/api/teachers${buildStrapiQuery()}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des enseignants:', error);
      throw error;
    }
  },

  // Paramètres généraux du site
  getSiteSettings: async () => {
    try {
      const response = await api.get(`/api/site-settings${buildStrapiQuery()}`);
      return response.data?.data || null;
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres:', error);
      throw error;
    }
  },
};

export default strapiService;
