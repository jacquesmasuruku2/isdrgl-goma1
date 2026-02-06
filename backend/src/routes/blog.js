const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// GET all published blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.getAll();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET featured blog posts
router.get('/featured', async (req, res) => {
  try {
    const blogPosts = await BlogPost.getFeatured();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET blog posts by category
router.get('/category/:category', async (req, res) => {
  try {
    const blogPosts = await BlogPost.getByCategory(req.params.category);
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const blogPost = await BlogPost.getBySlug(req.params.slug);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create blog post
router.post('/', async (req, res) => {
  try {
    const blogPost = await BlogPost.create(req.body);
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update blog post
router.put('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.update(req.params.id, req.body);
    res.json(blogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE blog post
router.delete('/:id', async (req, res) => {
  try {
    await BlogPost.delete(req.params.id);
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
