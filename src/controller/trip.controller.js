const { logger, readFile, updateFile } = require("../utils/fs");
const { v4: uuid } = require('uuid');
const AppError = require("../utils/AppError");


async function createTripHandler(req, res) {
    const trip = { ...req.body, id: uuid() }
    await logger(trip, 'trips.json');
    res.status(201).json(trip)
}


async function getTripsHandler(req, res) {
    const trips = await readFile('trips.json');
    res.json(trips)
}

async function getTripHandler(req, res) {
    const trips = await readFile('trips.json');
    const trip = trips.find(dr => dr.id === req.params.id);
    if(!trip) throw new AppError('No trip with such id', 404);
    res.json(trip)  
}

async function updateTripHandler(req, res) {
    const trips = await readFile('trips.json');
    const trip = trips.find(dr => dr.id === req.params.id);
    if(!trip) throw new AppError('No trip with such id', 404);
    const updatedTrip = {...trip, ...req.body };
    const newData = [...trips.filter(dr => dr.id !== updatedTrip.id), updatedTrip];
    await updateFile('trips.json', newData)
    res.json(updatedTrip)
}

async function deleteTripHandler(req, res) {
    const trips = await readFile('trips.json');
    const trip = trips.find(dr => dr.id === req.params.id);
    if(!trip) throw new AppError('No trip with such id', 404);
    const newData = trips.filter(dr => dr.id !== trip.id);
    await updateFile('trips.json', newData)
    res.json(trip) 
}

module.exports = { createTripHandler, getTripsHandler, getTripHandler, updateTripHandler, deleteTripHandler }