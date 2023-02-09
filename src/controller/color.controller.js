const { logger, readFile, updateFile } = require("../utils/fs");
const { v4: uuid } = require('uuid');
const AppError = require("../utils/AppError");


async function createColorHandler(req, res) {
    const color = { ...req.body, id: uuid() }
    await logger(color, 'colors.json');
    res.status(201).json(color)
}


async function getColorsHandler(req, res) {
    const colors = await readFile('colors.json');
    res.json(colors)
}

async function getColorHandler(req, res) {
    const colors = await readFile('colors.json');
    const color = colors.find(dr => dr.id === req.params.id);
    if(!color) throw new AppError('No color with such id', 404);
    res.json(color)
}

async function updateColorHandler(req, res) {
    const colors = await readFile('colors.json');
    const color = colors.find(dr => dr.id === req.params.id);
    if(!color) throw new AppError('No color with such id', 404);
    const updatedColor = {...color, ...req.body };
    const newData = [...colors.filter(dr => dr.id !== updatedColor.id), updatedColor];
    await updateFile('colors.json', newData)
    res.json(updatedColor)
}

async function deleteColorHandler(req, res) {
    const colors = await readFile('colors.json');
    const color = colors.find(dr => dr.id === req.params.id);
    if(!color) throw new AppError('No color with such id', 404);
    const newData = colors.filter(dr => dr.id !== color.id);
    await updateFile('colors.json', newData)
    res.json(color) 
}

module.exports = { createColorHandler, getColorHandler, getColorsHandler, updateColorHandler, deleteColorHandler }