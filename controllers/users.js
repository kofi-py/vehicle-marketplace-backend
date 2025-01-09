const { createUser, getUserByEmail } = require('../models/users')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await createUser({ name, email, password: hashedPassword })
    res.status(201).json({ message: 'User registered successfully', userId })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await getUserByEmail(email)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' })

    res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    next(error)
  }
}

module.exports = { registerUser, loginUser }
