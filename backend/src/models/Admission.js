const supabase = require('../config/supabase');

const Admission = {
  // Get all admissions
  async getAll() {
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get by status
  async getByStatus(status) {
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Create
  async create(admissionData) {
    const { data, error } = await supabase
      .from('admissions')
      .insert([
        {
          first_name: admissionData.firstName,
          last_name: admissionData.lastName,
          email: admissionData.email,
          phone: admissionData.phone,
          date_of_birth: admissionData.dateOfBirth,
          address: admissionData.address,
          department_id: admissionData.department,
          qualifications: admissionData.qualifications,
          parent_full_name: admissionData.parentFullName,
          parent_phone: admissionData.parentPhone,
          documents: admissionData.documents
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update
  async update(id, admissionData) {
    const { data, error } = await supabase
      .from('admissions')
      .update({
        first_name: admissionData.firstName,
        last_name: admissionData.lastName,
        phone: admissionData.phone,
        address: admissionData.address,
        qualifications: admissionData.qualifications,
        parent_full_name: admissionData.parentFullName,
        parent_phone: admissionData.parentPhone,
        status: admissionData.status,
        documents: admissionData.documents,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update status
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('admissions')
      .update({
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete
  async delete(id) {
    const { data, error } = await supabase
      .from('admissions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  }
};

module.exports = Admission;
