const { logger, readFile, updateFile } = require("../utils/fs");
const { v4: uuid } = require('uuid');
const AppError = require("../utils/AppError");


async function createVehicleHandler(req, res) {
    const vehicle = { ...req.body, id: uuid() }
    await logger(vehicle, 'vehicles.json');
    res.status(201).json(vehicle)
}


async function getVehiclesHandler(req, res) {
    const vehicles = await readFile('vehicles.json');
    res.json(vehicles)
}

async function getVehicleHandler(req, res) {
    const vehicles = await readFile('vehicles.json');
    const vehicle = vehicles.find(dr => dr.id === req.params.id);
    if(!vehicle) throw new AppError('No vehicle with such id', 404);
    res.json(vehicle)
}

async function updateVehicleHandler(req, res) {
    const vehicles = await readFile('vehicles.json');
    const vehicle = vehicles.find(dr => dr.id === req.params.id);
    if(!vehicle) throw new AppError('No vehicle with such id', 404);
    const updatedVehicle = {...vehicle, ...req.body };
    const newData = [...vehicles.filter(dr => dr.id !== updatedVehicle.id), updatedVehicle];
    await updateFile('vehicles.json', newData)
    res.json(updatedVehicle)
}

async function deleteVehicleHandler(req, res) {
    const vehicles = await readFile('vehicles.json');
    const vehicle = vehicles.find(dr => dr.id === req.params.id);
    if(!vehicle) throw new AppError('No vehicle with such id', 404);
    const newData = vehicles.filter(dr => dr.id !== vehicle.id);
    await updateFile('vehicles.json', newData)
    res.json(vehicle) 
}

module.exports = { createVehicleHandler, getVehicleHandler, getVehiclesHandler, updateVehicleHandler, deleteVehicleHandler }