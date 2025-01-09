const axios = require('axios')

/**
 *
 * @param {String} zip1
 * @param {String} zip2
 * @returns
 */

const calculateDistance = async (zip1, zip2) => {
  try {
    console.log('Vehicle Zip Code:', zip2)
    const url = `https://www.zipcodeapi.com/rest/rxRZdC9tOzcMHfTA1PZo5SLTmWnQU5GgdBdQua77Fe5CYwvAzPNdG3Y1LwGlQTL0/distance.json/${zip1}/${zip2}/mile`
    console.log('ZipCodeAPI URL:', url)

    const response = await axios.get(url)

    if (response.data && response.data.distance) {
      return response.data.distance
    } else {
      throw new Error('Invalid response from API')
    }
  } catch (error) {
    console.error('Error calculating distance:', error.message)
    return 'Error calculating distance'
  }
}

module.exports = { calculateDistance }
