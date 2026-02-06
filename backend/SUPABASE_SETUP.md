# Supabase Database Setup

This guide explains how to set up and initialize the Supabase database for the ISDR-GL application.

## Prerequisites

- Supabase account (create one at https://supabase.com)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create a new account
3. Click "New Project"
4. Fill in:
   - **Name**: isdr-gl
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose the region closest to you
5. Click "Create new project" and wait for it to complete (5-10 minutes)

## Step 2: Get Your Credentials

1. Once your project is created, go to **Settings** → **API**
2. You'll find:
   - **Project URL** (copy this as `SUPABASE_URL`)
   - **anon public** (copy this as `SUPABASE_ANON_KEY`)
   - **service_role** (copy this as `SUPABASE_SERVICE_KEY`)

## Step 3: Update Environment Variables

Update your `.env` file in the `backend` folder with your credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://xyzxyzxyz.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d

# API Configuration
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

# File Upload (Supabase Storage)
SUPABASE_STORAGE_BUCKET=uploads
MAX_FILE_SIZE=5242880
```

## Step 4: Create Database Tables

### Option A: Using Supabase Console (Recommended for beginners)

1. Go to your Supabase project
2. Click on **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the entire content of `src/config/schema.sql`
5. Click **Run**

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase link --project-ref your_project_ref

# Run migrations
supabase db pull > src/config/schema.sql
```

## Step 5: Verify the Setup

Run your backend:

```bash
cd backend
npm install
npm run dev
```

You should see:
```
✓ Supabase connected successfully
Server running on port 5000
```

Test the API:
```bash
curl http://localhost:5000/api/health
```

You should get:
```json
{
  "status": "OK",
  "timestamp": "2026-02-06T20:00:00.000Z"
}
```

## Database Schema Overview

### Tables

- **departments** - Institution departments
- **teachers** - Faculty members
- **admissions** - Student admission applications
- **blog_posts** - Blog articles and announcements
- **contacts** - Contact form submissions

### Key Features

- UUIDs for all primary keys (distributed system safe)
- Automatic timestamps (created_at, updated_at)
- Indexes on frequently queried columns
- Foreign key relationships with CASCADE delete
- JSONB columns for flexible data storage

## Seed Data (Optional)

To add sample data, you can run:

```sql
-- Example: Insert a sample department
INSERT INTO departments (name, description, is_active)
VALUES ('Computer Science', 'Department of Computer Science and Engineering', true);

-- Example: Insert a sample teacher
INSERT INTO teachers (
  first_name, last_name, email, specialization, department_id
) VALUES (
  'Jean', 'Dupont', 'jean.dupont@isdr-gl.edu', 'Web Development',
  (SELECT id FROM departments WHERE name = 'Computer Science' LIMIT 1)
);
```

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
Make sure you've installed dependencies:
```bash
npm install
```

### "Supabase connection warning"
1. Check your `.env` file has correct credentials
2. Verify the project URL format (should be `https://xxx.supabase.co`)
3. Make sure your API key is copied correctly (no extra spaces)

### "Table doesn't exist"
Make sure you've run the SQL schema from `src/config/schema.sql` in your Supabase console.

### "Row level security (RLS) policy error"
By default, Supabase enables RLS. You have two options:

**Option 1: Disable RLS (Quick for development)**
1. Go to **Authentication** → **Policies**
2. Click on a table
3. Click **Disable RLS**

**Option 2: Create Policies (Recommended for production)**
```sql
-- Allow public read on published blog posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_published" ON blog_posts
  FOR SELECT USING (is_published = true);
```

## Next Steps

1. Install frontend dependencies: `cd frontend && npm install`
2. Start the frontend: `npm start`
3. Connect to your API at `http://localhost:5000`

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
