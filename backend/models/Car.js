const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Number, default: 0 }, // 0 = not inspected, 1 = inspecting, 2 = inspected
});
module.exports = mongoose.model('Car', CarSchema);