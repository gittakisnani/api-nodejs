const Joi = require('joi');

const createUserSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required().min(1),
        description: Joi.string().required().min(1),
        picture: Joi.string().required()
    })
})

const getDriverSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    })
})

const updatedDriverSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        name: Joi.string().optional().min(1),
        description: Joi.string().optional().min(1),
        picture: Joi.string().optional()
    })
})


module.exports = { createUserSchema, getDriverSchema, updatedDriverSchema }