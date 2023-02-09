const validateSchema = (schema) => (req, res, next) => {
    const { error = null } = schema.unknown(true).validate({ body: req.body, params: req.params });
    next(error)
}

module.exports = validateSchema;