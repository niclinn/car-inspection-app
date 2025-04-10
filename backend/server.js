const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const carRoutes = require('./routes/cars');
const inspectionRoutes = require('./routes/inspection');
const criteriaRoutes = require('./routes/criteria');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/cars', carRoutes);
app.use('/api/inspection', inspectionRoutes);
app.use('/api/criteria', criteriaRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));