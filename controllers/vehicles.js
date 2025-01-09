const db = require('../database') // Import the database connection
const { calculateDistance } = require('../utils/distance') // Import the distance utility function

// Fetch all vehicles with distances from the user's location
const getVehiclesWithDistance = async (req, res) => {
  try {
    const userId = req.query.user_id

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    // Fetch user's zip code
    const [
      user,
    ] = await db.execute('SELECT zip_code FROM users WHERE user_id = ?', [
      userId,
    ])
    console.log('User Query Result:', user)

    const userZipCode = user?.[0]?.zip_code
    if (!userZipCode) {
      console.error('Zip code not found for user_id:', userId)
      return res.status(400).json({ error: 'Zip code is required' })
    }

    console.log('User Zip Code:', userZipCode)

    // Fetch all vehicles
    const [vehicles] = await db.execute('SELECT * FROM vehicles')

    // Calculate distances
    const vehiclesWithDistance = await Promise.all(
      vehicles.map(async (vehicle) => {
        try {
          const distance = await calculateDistance(
            userZipCode,
            vehicle.zip_code,
          )
          return { ...vehicle, distance }
        } catch (err) {
          console.error(
            'Error calculating distance for vehicle:',
            vehicle.id,
            err.message,
          )
          return { ...vehicle, distance: null }
        }
      }),
    )

    res.json(vehiclesWithDistance)
  } catch (err) {
    console.error('Error in getVehiclesWithDistance:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    // Fetch all vehicles
    const [vehicles] = await db.query('SELECT * FROM vehicles')

    // Exclude 'distance' from each vehicle
    const filteredVehicles = vehicles.map(({ distance, ...rest }) => rest)

    res.status(200).json(filteredVehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error.message)
    res.status(500).json({ error: 'Failed to fetch vehicles' })
  }
}

// Create a new vehicle
const addVehicle = async (req, res) => {
  try {
    const {
      name,
      make,
      model,
      year,
      price,
      zip_code,
      description,
      image_url,
    } = req.body

    if (!name || !make || !model || !year || !price || !zip_code) {
      return res
        .status(400)
        .json({ error: 'All required fields must be provided' })
    }

    const result = await db.execute(
      'INSERT INTO vehicles (name, make, model, year, price, zip_code, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, make, model, year, price, zip_code, description, image_url],
    )

    res.status(201).json({
      message: 'Vehicle created successfully',
      vehicleId: result[0].insertId,
    })
  } catch (err) {
    console.error('Error in createVehicle:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  addVehicle,
  getVehiclesWithDistance,
  getAllVehicles,
}
