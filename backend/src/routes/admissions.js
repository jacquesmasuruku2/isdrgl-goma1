const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');

// GET all admissions
router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.getAll();
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET admissions by status
router.get('/status/:status', async (req, res) => {
  try {
    const admissions = await Admission.getByStatus(req.params.status);
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single admission
router.get('/:id', async (req, res) => {
  try {
    const admission = await Admission.getById(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create admission
router.post('/', async (req, res) => {
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json(admission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update admission
router.put('/:id', async (req, res) => {
  try {
    const admission = await Admission.update(req.params.id, req.body);
    res.json(admission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update admission status
router.put('/:id/status', async (req, res) => {
  try {
    const admission = await Admission.updateStatus(req.params.id, req.body.status);
    res.json(admission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE admission
router.delete('/:id', async (req, res) => {
  try {
    await Admission.delete(req.params.id);
    res.json({ message: 'Admission deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
