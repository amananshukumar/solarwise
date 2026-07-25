const { getWeatherForCity } = require('./services/weatherService');
const { sampleStateData, getCoordinatesForCity } = require('./seed/seedStateData');

async function testWeatherModule() {
  console.log('Testing Phase 5 Weather Service & Caching...');

  // Test 1: Coordinate Lookup
  const mumbaiCoords = getCoordinatesForCity('Mumbai');
  console.log('✔ Mumbai Coordinates:', mumbaiCoords);

  const ahmedabadCoords = getCoordinatesForCity('Ahmedabad');
  console.log('✔ Ahmedabad Coordinates:', ahmedabadCoords);

  // Test 2: Weather Fetch (Open-Meteo)
  console.log('Fetching live weather for Ahmedabad...');
  const weather1 = await getWeatherForCity('Ahmedabad', ahmedabadCoords.lat, ahmedabadCoords.lng);
  console.log('✔ Live Weather Result:', {
    city: weather1.city,
    temp: weather1.temperatureC + '°C',
    condition: weather1.condition,
    sunshineHours: weather1.sunshineHours + ' hrs/day',
    cached: weather1.cached,
  });

  // Test 3: Backend Cache Verification
  console.log('Fetching weather for Ahmedabad again (should hit cache)...');
  const weather2 = await getWeatherForCity('Ahmedabad', ahmedabadCoords.lat, ahmedabadCoords.lng);
  console.log('✔ Cached Weather Result:', {
    city: weather2.city,
    cached: weather2.cached,
  });

  if (weather2.cached) {
    console.log('✅ Backend 1-Hour TTL Weather Cache Verified Successfully!');
  } else {
    console.warn('⚠️ Cache flag was false.');
  }
}

testWeatherModule();
