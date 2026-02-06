const supabase = require('../config/supabase');

const Contact = {
  // Get all contacts
  async getAll() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get by status
  async getByStatus(status) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Create
  async create(contactData) {
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          subject: contactData.subject,
          message: contactData.message
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update
  async update(id, contactData) {
    const updateObj = {
      updated_at: new Date().toISOString()
    };

    if (contactData.status) {
      updateObj.status = contactData.status;
      if (contactData.status === 'resolved') {
        updateObj.responded_at = new Date().toISOString();
      }
    }
    if (contactData.response) {
      updateObj.response = contactData.response;
    }

    const { data, error } = await supabase
      .from('contacts')
      .update(updateObj)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete
  async delete(id) {
    const { data, error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  }
};

module.exports = Contact;
