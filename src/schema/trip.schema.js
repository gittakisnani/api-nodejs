const Joi = require('joi');

const createTripSchema = Joi.object({
    body: Joi.object({
        arrivalTime: Joi.date().required().min(Date.now()),
        arrivalLocation: Joi.string().required().min(1),
        pickUpLocation: Joi.string().required().min(1),
        paymentType: Joi.string().required().min(1),
        dropOffLocation: Joi.string().required().min(1),
        passengerNote: Joi.string().required().min(1),
        passengers: Joi.array().items(Joi.number().required()).required().length(2),
        fare: Joi.array().items(Joi.number().required()).required().length(2)
    })
})

const getTripSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    })
})

const updateTripSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        arrivalTime: Joi.date().optional().min(Date.now()),
        arrivalLocation: Joi.string().optional().min(1),
        pickUpLocation: Joi.string().optional().min(1),
        paymentType: Joi.string().optional().min(1),
        dropOffLocation: Joi.string().optional().min(1),
        passengerNote: Joi.string().optional().min(1),
        passengers: Joi.array().items(Joi.number().required()).optional().length(2),
        fare: Joi.array().items(Joi.number().required()).optional().length(2)
    })
})


module.exports = { createTripSchema, getTripSchema, updateTripSchema }