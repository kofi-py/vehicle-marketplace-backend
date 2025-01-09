const validateUserInput = (input) => {
  const { name, email, password } = input
  if (!name || !email || !password) return 'All fields are required'
  if (password.length < 6) return 'Password must be at least 6 characters long'
  return null
}

module.exports = { validateUserInput }
