const express = require('express');
const cors = require('cors');

const ownersRoutes = require('./routes/owners.routes');
const petsRoutes = require('./routes/pets.routes');
const appointmentsRoutes = require('./routes/appointments.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/owners', ownersRoutes);
app.use('/pets', petsRoutes);
app.use('/appointments', appointmentsRoutes);

module.exports = app;
