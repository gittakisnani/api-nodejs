const { logger, readFile, updateFile } = require("../utils/fs");
const { v4: uuid }= require('uuid');
const AppError = require("../utils/AppError");

async function createUserHandler(req, res) {
    const driver = {...req.body, id: uuid()} ;
    await logger(driver, 'drivers.json');
    res.status(201).json(driver)
}


async function getDriversHandler(req, res) {
    const drivers = await readFile('drivers.json');
    res.json(drivers)
}

async function getDriverHandler(req, res) {
    const drivers = await readFile('drivers.json');
    const driver = drivers.find(dr => dr.id === req.params.id);
    if(!driver) throw new AppError('No driver with such id', 404);
    res.json(driver)
}

async function updateDriverHandler(req, res) {
    const drivers = await readFile('drivers.json');
    const driver = drivers.find(dr => dr.id === req.params.id);
    if(!driver) throw new AppError('No driver with such id', 404);
    const updatedDriver = {...driver, ...req.body };
    const newData = [...drivers.filter(dr => dr.id !== updatedDriver.id), updatedDriver];
    await updateFile('drivers.json', newData)
    res.json(updatedDriver)
}

async function deleteDriverHandler(req, res) {
    const drivers = await readFile('drivers.json');
    const driver = drivers.find(dr => dr.id === req.params.id);
    if(!driver) throw new AppError('No driver with such id', 404);
    const newData = drivers.filter(dr => dr.id !== driver.id);
    await updateFile('drivers.json', newData)
    res.json(driver) 
}

module.exports = { createUserHandler, getDriversHandler, getDriverHandler, updateDriverHandler, deleteDriverHandler  }