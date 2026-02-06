const supabase = require('../config/supabase');

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const BlogPost = {
  // Get all published posts
  async getAll() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get featured posts
  async getFeatured() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    return data;
  },

  // Get by category
  async getByCategory(category) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    // Increment views
    if (data) {
      await supabase
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);
    }

    return data;
  },

  // Create
  async create(blogData) {
    const slug = generateSlug(blogData.title);

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          title: blogData.title,
          slug: slug,
          excerpt: blogData.excerpt,
          content: blogData.content,
          author_id: blogData.author,
          category: blogData.category,
          featured: blogData.featured,
          image: blogData.image,
          tags: blogData.tags,
          is_published: blogData.isPublished
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update
  async update(id, blogData) {
    const updateData = {
      excerpt: blogData.excerpt,
      content: blogData.content,
      author_id: blogData.author,
      category: blogData.category,
      featured: blogData.featured,
      image: blogData.image,
      tags: blogData.tags,
      is_published: blogData.isPublished,
      updated_at: new Date().toISOString()
    };

    if (blogData.title) {
      updateData.title = blogData.title;
      updateData.slug = generateSlug(blogData.title);
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete
  async delete(id) {
    const { data, error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  }
};

module.exports = BlogPost;
