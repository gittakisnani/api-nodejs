const Joi = require('joi');

const createVehicleSchema = Joi.object({
    body: Joi.object({
        picture: Joi.string().required().min(1),
        name: Joi.string().required().min(1),
        make: Joi.string().required().min(1),
        model: Joi.string().required().min(1),
        color: Joi.string().required().min(1),
    })
})

const getVehicleSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    })
})

const updateVehicleSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        picture: Joi.string().optional().min(1),
        name: Joi.string().optional().min(1),
        make: Joi.string().optional().min(1),
        model: Joi.string().optional().min(1),
        color: Joi.string().optional().min(1),
    })
})


module.exports = { createVehicleSchema, getVehicleSchema, updateVehicleSchema }