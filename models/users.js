const pool = require('../database')

const createUser = async (user) => {
  const { name, email, password } = user
  const [
    result,
  ] = await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
  )
  return result.insertId
}

const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
    email,
  ])
  return rows[0]
}

module.exports = { createUser, getUserByEmail }
