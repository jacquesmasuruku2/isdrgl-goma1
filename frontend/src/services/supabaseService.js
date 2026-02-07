import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabaseService = {
  // Departments
  getDepartments: async () => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des départements:', error);
      throw error;
    }
  },

  getDepartmentBySlug: async (slug) => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération du département:', error);
      throw error;
    }
  },

  // Teachers
  getTeachers: async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_active', true)
        .order('first_name', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des enseignants:', error);
      throw error;
    }
  },

  // Blog posts
  getBlogs: async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des blogs:', error);
      throw error;
    }
  },

  getBlogBySlug: async (slug) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération du blog:', error);
      throw error;
    }
  },

  // Admissions
  createAdmission: async (admissionData) => {
    try {
      const { data, error } = await supabase
        .from('admissions')
        .insert([admissionData])
        .select();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'admission:', error);
      throw error;
    }
  },

  getAdmissions: async () => {
    try {
      const { data, error } = await supabase
        .from('admissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des admissions:', error);
      throw error;
    }
  },

  // Commentaires sur les blogs
  getComments: async (blogId) => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_id', blogId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      throw error;
    }
  },

  addComment: async (commentData) => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .insert([commentData])
        .select();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      throw error;
    }
  },

  // Contact
  createContact: async (contactData) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([contactData])
        .select();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw error;
    }
  },
};

export default supabaseService;
