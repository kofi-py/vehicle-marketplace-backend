const pool = require('../database')

const createVehicle = async (vehicle) => {
  const { name, location, price, zip_code } = vehicle
  const [
    result,
  ] = await pool.query(
    'INSERT INTO vehicles (name, location, price, zip_code) VALUES (?, ?, ?, ?)',
    [name, location, price, zip_code],
  )
  return result.insertId
}

const getVehicles = async () => {
  const [rows] = await pool.query('SELECT * FROM vehicles')
  return rows
}

module.exports = { createVehicle, getVehicles }
