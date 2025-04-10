const express = require('express');
const router = express.Router();
const Criteria = require('../models/Criteria');

// GET /api/criteria - returns the list of all inspection criteria
router.get('/', async (req, res) => {
  try {
    const criteria = await Criteria.find();
    res.json(criteria);
  } catch (err) {
    console.error('Error fetching criteria:', err);
    res.status(500).json({ error: 'Failed to fetch criteria' });
  }
});

module.exports = router;
