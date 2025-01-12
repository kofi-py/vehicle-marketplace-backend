const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicles') // Adjust path as necessary

// Route to get all vehicles without distance
router.get('/all', vehicleController.getAllVehicles)

// Route to get all vehicles with distances (requires user_id)
router.get('/with-distance', vehicleController.getVehiclesWithDistance)

// Route to create a new vehicle
router.post('/add', vehicleController.addVehicle)

router.get('/', vehicleController.getAllVehicles)

module.exports = router
