const validateSchema = require('../middleware/validateSchema');
const vehicleSchemas = require('../schema/vehicle.schema');
const vehicleHandlers = require('../controller/vehicle.controller')
const TryCatch = require('../utils/TryCatch');
const fileExist = require('../middleware/checkFile');
const Router = require('express').Router;


const router = Router();

router.use(fileExist('vehicles.json'))

router.post('/create', validateSchema(vehicleSchemas.createVehicleSchema), TryCatch(vehicleHandlers.createVehicleHandler))
router.get('/', TryCatch(vehicleHandlers.getVehiclesHandler));


router.route('/:id')
    .get(validateSchema(vehicleSchemas.getVehicleSchema), TryCatch(vehicleHandlers.getVehicleHandler))
    .put(validateSchema(vehicleSchemas.updateVehicleSchema), TryCatch(vehicleHandlers.updateVehicleHandler))
    .patch(validateSchema(vehicleSchemas.updateVehicleSchema), TryCatch(vehicleHandlers.updateVehicleHandler))
    .delete(validateSchema(vehicleSchemas.getVehicleSchema), TryCatch(vehicleHandlers.deleteVehicleHandler))

module.exports = router