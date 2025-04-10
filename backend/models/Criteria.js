const mongoose = require('mongoose');
const CriteriaSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
module.exports = mongoose.model('Criteria', CriteriaSchema);