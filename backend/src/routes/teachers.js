const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// GET all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.getAll();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET teachers by department
router.get('/department/:departmentId', async (req, res) => {
  try {
    const teachers = await Teacher.getByDepartment(req.params.departmentId);
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single teacher
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.getById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create teacher
router.post('/', async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update teacher
router.put('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.update(req.params.id, req.body);
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE teacher
router.delete('/:id', async (req, res) => {
  try {
    await Teacher.delete(req.params.id);
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
