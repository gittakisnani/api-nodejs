const validateSchema = require('../middleware/validateSchema');
const tripSchema = require('../schema/trip.schema');
const tripHandlers = require('../controller/trip.controller')
const TryCatch = require('../utils/TryCatch');
const fileExist = require('../middleware/checkFile');
const Router = require('express').Router;


const router = Router();

router.use(fileExist('trips.json'))

router.post('/create', validateSchema(tripSchema.createTripSchema), TryCatch(tripHandlers.createTripHandler))
router.get('/', TryCatch(tripHandlers.getTripsHandler));


router.route('/:id')
    .get(validateSchema(tripSchema.getTripSchema), TryCatch(tripHandlers.getTripHandler))
    .put(validateSchema(tripSchema.updateTripSchema), TryCatch(tripHandlers.updateTripHandler))
    .patch(validateSchema(tripSchema.updateTripSchema), TryCatch(tripHandlers.updateTripHandler))
    .delete(validateSchema(tripSchema.getTripSchema), TryCatch(tripHandlers.deleteTripHandler))

module.exports = router