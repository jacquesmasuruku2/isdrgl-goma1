const supabase = require('../config/supabase');

const Department = {
  // Get all departments
  async getAll() {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create
  async create(departmentData) {
    const { data, error } = await supabase
      .from('departments')
      .insert([
        {
          name: departmentData.name,
          description: departmentData.description,
          image: departmentData.image,
          head_of_department: departmentData.headOfDepartment
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update
  async update(id, departmentData) {
    const { data, error } = await supabase
      .from('departments')
      .update({
        name: departmentData.name,
        description: departmentData.description,
        image: departmentData.image,
        head_of_department: departmentData.headOfDepartment,
        number_of_students: departmentData.numberOfStudents,
        number_of_teachers: departmentData.numberOfTeachers,
        is_active: departmentData.isActive,
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
      .from('departments')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  }
};

module.exports = Department;
