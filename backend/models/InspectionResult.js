const mongoose = require('mongoose');
const InspectionResultSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  criteriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Criteria', required: true },
  is_good: { type: Boolean, required: true },
  note: { type: String },
});
module.exports = mongoose.model('InspectionResult', InspectionResultSchema);
