const GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const WX = 'https://api.open-meteo.com/v1/forecast';

export async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

// city name in, weather out
export async function loadWeather(city) {
  const q = new URLSearchParams({ name: city, count: 1 });
  const geo = await getJSON(`${GEO}?${q}`);
  if (!geo.results?.length) throw new Error('not-found');

  const { latitude, longitude, name } = geo.results[0];
  const p = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
  });
  return { name, ...(await getJSON(`${WX}?${p}`)) };
}

// turn an error into words a person can understand
export function friendly(err) {
  if (err.message === 'not-found') return 'City not found. Check the spelling and try again.';
  if (err.message === 'HTTP 429') return 'Too many requests. Wait a minute and try again.';
  return "Couldn't reach the weather server. Check your connection and try again.";
}
