const supabase = require('../config/supabase');

const Teacher = {
  // Get all teachers
  async getAll() {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('is_active', true)
      .order('first_name', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get by department
  async getByDepartment(departmentId) {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('department_id', departmentId)
      .eq('is_active', true)
      .order('first_name', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Create
  async create(teacherData) {
    const { data, error } = await supabase
      .from('teachers')
      .insert([
        {
          first_name: teacherData.firstName,
          last_name: teacherData.lastName,
          email: teacherData.email,
          phone: teacherData.phone,
          specialization: teacherData.specialization,
          department_id: teacherData.department,
          bio: teacherData.bio,
          photo: teacherData.photo,
          qualifications: teacherData.qualifications,
          experience: teacherData.experience
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update
  async update(id, teacherData) {
    const { data, error } = await supabase
      .from('teachers')
      .update({
        first_name: teacherData.firstName,
        last_name: teacherData.lastName,
        phone: teacherData.phone,
        specialization: teacherData.specialization,
        bio: teacherData.bio,
        photo: teacherData.photo,
        qualifications: teacherData.qualifications,
        experience: teacherData.experience,
        is_active: teacherData.isActive,
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
      .from('teachers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  }
};

module.exports = Teacher;
