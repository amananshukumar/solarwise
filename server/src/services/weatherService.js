const https = require('https');
const { getCoordinatesForCity } = require('../seed/seedStateData');

// In-Memory Weather Cache (TTL = 1 hour)
const weatherCache = new Map();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Weather Code Interpretation Map (WMO Weather interpretation codes)
const mapWmoWeatherCode = (code) => {
  if (code === 0) return { condition: 'Clear Sky', icon: '☀️' };
  if (code >= 1 && code <= 3) return { condition: 'Partly Cloudy', icon: '⛅' };
  if (code === 45 || code === 48) return { condition: 'Foggy', icon: '🌫️' };
  if (code >= 51 && code <= 67) return { condition: 'Light Rain', icon: '🌧️' };
  if (code >= 80 && code <= 82) return { condition: 'Rain Showers', icon: '🌦️' };
  if (code >= 95 && code <= 99) return { condition: 'Thunderstorm', icon: '🌩️' };
  return { condition: 'Sunny', icon: '☀️' };
};

// Fetch raw data from Open-Meteo API
const fetchOpenMeteo = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=sunshine_duration,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata`;

    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (err) {
            reject(err);
          }
        });
      })
      .on('error', (err) => reject(err));
  });
};

const getWeatherForCity = async (cityName, latParam, lngParam) => {
  const city = cityName || 'Mumbai';
  
  // Resolve coordinates
  let lat = Number(latParam);
  let lng = Number(lngParam);

  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    const coords = getCoordinatesForCity(city);
    lat = coords.lat;
    lng = coords.lng;
  }

  const cacheKey = `${city.toLowerCase()}_${lat.toFixed(2)}_${lng.toFixed(2)}`;
  const now = Date.now();

  // Check backend cache
  if (weatherCache.has(cacheKey)) {
    const cached = weatherCache.get(cacheKey);
    if (now - cached.timestamp < CACHE_TTL_MS) {
      return {
        ...cached.data,
        cached: true,
      };
    }
  }

  try {
    const rawData = await fetchOpenMeteo(lat, lng);

    const currentWeather = rawData.current_weather || {};
    const daily = rawData.daily || {};

    // Sunshine duration from daily array in seconds -> convert to hours
    let avgSunshineHours = 5.5;
    if (daily.sunshine_duration && daily.sunshine_duration.length > 0) {
      const validDurations = daily.sunshine_duration.filter((val) => val != null);
      if (validDurations.length > 0) {
        const sumSeconds = validDurations.reduce((acc, curr) => acc + curr, 0);
        const avgSeconds = sumSeconds / validDurations.length;
        avgSunshineHours = Number((avgSeconds / 3600).toFixed(1));
      }
    }

    const weatherInfo = mapWmoWeatherCode(currentWeather.weathercode || 0);

    const responsePayload = {
      city,
      coordinates: { lat, lng },
      temperatureC: currentWeather.temperature || 31.5,
      windspeedKmh: currentWeather.windspeed || 12.0,
      weatherCode: currentWeather.weathercode || 0,
      condition: weatherInfo.condition,
      icon: weatherInfo.icon,
      sunshineHours: avgSunshineHours,
      cached: false,
      timestamp: new Date().toISOString(),
    };

    // Store in cache
    weatherCache.set(cacheKey, {
      timestamp: now,
      data: responsePayload,
    });

    return responsePayload;
  } catch (error) {
    console.warn(`[Weather Warning] Open-Meteo API fetch failed for ${city}: ${error.message}. Returning fallback solar weather.`);
    
    // Fallback data if Open-Meteo network request fails
    return {
      city,
      coordinates: { lat, lng },
      temperatureC: 32.0,
      windspeedKmh: 14.5,
      weatherCode: 0,
      condition: 'Sunny & Clear',
      icon: '☀️',
      sunshineHours: 5.5,
      cached: false,
      isFallback: true,
      timestamp: new Date().toISOString(),
    };
  }
};

module.exports = {
  getWeatherForCity,
};
