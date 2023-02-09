const validateSchema = require('../middleware/validateSchema');
const driverSchemas = require('../schema/driver.schema');
const driverHandlers = require('../controller/driver.controller')
const TryCatch = require('../utils/TryCatch');
const fileExist = require('../middleware/checkFile');
const Router = require('express').Router;


const router = Router();

router.use(fileExist('drivers.json'))

router.post('/create', validateSchema(driverSchemas.createUserSchema), TryCatch(driverHandlers.createUserHandler))
router.get('/', TryCatch(driverHandlers.getDriversHandler));


router.route('/:id')
    .get(validateSchema(driverSchemas.getDriverSchema), TryCatch(driverHandlers.getDriverHandler))
    .put(validateSchema(driverSchemas.updatedDriverSchema), TryCatch(driverHandlers.updateDriverHandler))
    .patch(validateSchema(driverSchemas.updatedDriverSchema), TryCatch(driverHandlers.updateDriverHandler))
    .delete(validateSchema(driverSchemas.getDriverSchema), TryCatch(driverHandlers.deleteDriverHandler))

module.exports = router