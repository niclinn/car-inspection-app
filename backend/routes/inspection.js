const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const Criteria = require('../models/Criteria');
const InspectionResult = require('../models/InspectionResult');

router.post('/:carId', async (req, res) => {
  const { carId } = req.params;
  const { results } = req.body; // array of {criteriaId, is_good, note}

  let passedCount = 0;

  for (const r of results) {
    if (r.is_good) passedCount++;
    if (!r.is_good && (!r.note || r.note.trim() === '')) {
      return res.status(400).json({ error: 'Note required for failed criteria.' });
    }
  }

  const status = passedCount === 5 ? 2 : passedCount > 0 ? 1 : 0;

  await InspectionResult.deleteMany({ carId });
  await InspectionResult.insertMany(results.map(r => ({
    carId,
    criteriaId: r.criteriaId,
    is_good: r.is_good,
    note: r.is_good ? null : r.note,
  })));

  await Car.findByIdAndUpdate(carId, { status });

  res.json({ message: 'Inspection submitted', status });
});

module.exports = router;