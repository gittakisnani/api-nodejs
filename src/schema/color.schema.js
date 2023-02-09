const Joi = require('joi');

const colorObject = Joi.object({
    r: Joi.number().min(0).max(255).required(),
    g: Joi.number().min(0).max(255).required(),
    b: Joi.number().min(0).max(255).required(),
})

const createColorSchema = Joi.object({
    body: Joi.object({
        backgroundColor: colorObject.required(),
        colors: Joi.array().items(colorObject.required()).required()
    })
})

const getColorSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    })
})

const updatedColorSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        backgroundColor: colorObject.optional(),
        colors: Joi.array().items(colorObject.required()).optional()
    })
})


module.exports = { createColorSchema, getColorSchema, updatedColorSchema }