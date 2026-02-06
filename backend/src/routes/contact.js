const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contact messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.getAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET contact messages by status
router.get('/status/:status', async (req, res) => {
  try {
    const contacts = await Contact.getByStatus(req.params.status);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single contact message
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.getById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create contact message
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update contact message
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.update(req.params.id, req.body);
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE contact message
router.delete('/:id', async (req, res) => {
  try {
    await Contact.delete(req.params.id);
    res.json({ message: 'Contact message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
