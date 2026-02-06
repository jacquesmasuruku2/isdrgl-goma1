-- Enable Row Level Security (RLS) on all tables
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DEPARTMENTS POLICIES
-- ============================================
-- Allow anyone to read active departments
CREATE POLICY "departments_read_public" ON departments
  FOR SELECT
  USING (is_active = true);

-- Allow authenticated users to manage departments
CREATE POLICY "departments_manage_authenticated" ON departments
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- TEACHERS POLICIES
-- ============================================
-- Allow anyone to read active teachers
CREATE POLICY "teachers_read_public" ON teachers
  FOR SELECT
  USING (is_active = true);

-- Allow authenticated users to manage teachers
CREATE POLICY "teachers_manage_authenticated" ON teachers
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- ADMISSIONS POLICIES
-- ============================================
-- Allow anyone to create admission applications (no auth required)
CREATE POLICY "admissions_create_public" ON admissions
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to read all applications
CREATE POLICY "admissions_read_authenticated" ON admissions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to update admissions
CREATE POLICY "admissions_update_authenticated" ON admissions
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete admissions
CREATE POLICY "admissions_delete_authenticated" ON admissions
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- BLOG POSTS POLICIES
-- ============================================
-- Allow anyone to read published blog posts
CREATE POLICY "blog_posts_read_published" ON blog_posts
  FOR SELECT
  USING (is_published = true);

-- Allow authenticated users to read all blog posts (including drafts)
CREATE POLICY "blog_posts_read_authenticated" ON blog_posts
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to manage blog posts
CREATE POLICY "blog_posts_manage_authenticated" ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- CONTACTS POLICIES
-- ============================================
-- Allow anyone to create contact messages (no auth required)
CREATE POLICY "contacts_create_public" ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to read all contact messages
CREATE POLICY "contacts_read_authenticated" ON contacts
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to update contact messages (add responses)
CREATE POLICY "contacts_update_authenticated" ON contacts
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete contact messages
CREATE POLICY "contacts_delete_authenticated" ON contacts
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- ALTERNATIVE: PERMISSIVE POLICIES (For Development)
-- ============================================
-- If you want to disable RLS for easier testing during development,
-- uncomment these and comment out the specific policies above:

/*
ALTER TABLE departments DISABLE ROW LEVEL SECURITY;
ALTER TABLE teachers DISABLE ROW LEVEL SECURITY;
ALTER TABLE admissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
*/
