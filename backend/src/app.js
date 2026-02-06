require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import Supabase client
const supabase = require('./config/supabase');

// Import routes
const departmentRoutes = require('./routes/departments');
const teacherRoutes = require('./routes/teachers');
const admissionRoutes = require('./routes/admissions');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Supabase connection on startup
console.log('Connecting to Supabase...');
supabase
  .from('departments')
  .select('count', { count: 'exact', head: true })
  .then(() => console.log('✓ Supabase connected successfully'))
  .catch((error) => console.warn('⚠ Supabase connection warning:', error.message));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/departments', departmentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
