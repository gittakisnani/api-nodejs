const validateSchema = require('../middleware/validateSchema');
const colorSchemas = require('../schema/color.schema');
const colorHandlers = require('../controller/color.controller')
const TryCatch = require('../utils/TryCatch');
const fileExist = require('../middleware/checkFile');
const Router = require('express').Router;


const router = Router();

router.use(fileExist('colors.json'))

router.post('/create', validateSchema(colorSchemas.createColorSchema), TryCatch(colorHandlers.createColorHandler))
router.get('/', TryCatch(colorHandlers.getColorsHandler));


router.route('/:id')
    .get(validateSchema(colorSchemas.getColorSchema), TryCatch(colorHandlers.getColorHandler))
    .put(validateSchema(colorSchemas.updatedColorSchema), TryCatch(colorHandlers.updateColorHandler))
    .patch(validateSchema(colorSchemas.updatedColorSchema), TryCatch(colorHandlers.updateColorHandler))
    .delete(validateSchema(colorSchemas.getColorSchema), TryCatch(colorHandlers.deleteColorHandler))

module.exports = router