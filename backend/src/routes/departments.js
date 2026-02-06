const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.getAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single department
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.getById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create department
router.post('/', async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update department
router.put('/:id', async (req, res) => {
  try {
    const department = await Department.update(req.params.id, req.body);
    res.json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE department
router.delete('/:id', async (req, res) => {
  try {
    await Department.delete(req.params.id);
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
