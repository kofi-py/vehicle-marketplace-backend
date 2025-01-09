const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes = require('./routes/users')
const vehicleRoutes = require('./routes/vehicles')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/vehicles', vehicleRoutes)

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message)
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
