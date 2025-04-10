const mongoose = require('mongoose');
const Car = require('./models/Car');
const Criteria = require('./models/Criteria');

const MONGO_URI = 'mongodb://localhost:27017/carInspection';

const seed = async () => {
  await mongoose.connect(MONGO_URI);

  // Clear existing data
  await Car.deleteMany();
  await Criteria.deleteMany();

  // Add sample cars
  const cars = await Car.insertMany([
    { name: 'Toyota Camry' },
    { name: 'Honda Civic' },
    { name: 'Ford Mustang' },
    { name: 'Tesla Model 3' },
  ]);

  console.log(`✅ Inserted ${cars.length} cars`);

  // Add sample criteria (5 for inspection)
  const criteria = await Criteria.insertMany([
    { name: 'Brakes Functioning' },
    { name: 'Lights Operational' },
    { name: 'Tires Condition' },
    { name: 'No Fluid Leaks' },
    { name: 'Horn Works' },
  ]);

  console.log(`✅ Inserted ${criteria.length} criteria`);

  mongoose.disconnect();
};

seed().catch((err) => {
  console.error('❌ Seeding error:', err);
  mongoose.disconnect();
});
