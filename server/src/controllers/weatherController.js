const { getWeatherForCity } = require('../services/weatherService');

// @desc    Get live weather & sunshine hours for selected city
// @route   GET /api/weather
// @access  Public
const getWeather = async (req, res) => {
  try {
    const { city, lat, lng } = req.query;
    const weatherData = await getWeatherForCity(city, lat, lng);
    return res.json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    console.error('Weather controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve weather data',
    });
  }
};

module.exports = {
  getWeather,
};
