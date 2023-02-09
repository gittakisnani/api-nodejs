const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const appRoutes = require('./route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/drivers', appRoutes.driverRoute);
app.use('/vehicles', appRoutes.vehicleRoute);
app.use('/trips', appRoutes.tripRoute);
app.use('/colors', appRoutes.colorRoute);

app.all('*', (req, res) => {
    res.sendStatus(404)
})

app.use(errorHandler)

module.exports = app