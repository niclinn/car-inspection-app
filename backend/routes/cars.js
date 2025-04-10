const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

module.exports = router;