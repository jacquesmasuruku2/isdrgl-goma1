import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabaseService = {
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
