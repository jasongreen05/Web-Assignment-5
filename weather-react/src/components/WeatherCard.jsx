// Open-Meteo sends a weather code number: turn it into an icon and words
function getConditions(code) {
  if (code === 0) return { icon: '☀️', text: 'Clear sky' };
  if (code <= 2) return { icon: '⛅', text: 'Partly cloudy' };
  if (code === 3) return { icon: '☁️', text: 'Overcast' };
  if (code <= 48) return { icon: '🌫️', text: 'Fog' };
  if (code <= 57) return { icon: '🌦️', text: 'Drizzle' };
  if (code <= 67) return { icon: '🌧️', text: 'Rain' };
  if (code <= 77) return { icon: '❄️', text: 'Snow' };
  if (code <= 82) return { icon: '🌧️', text: 'Rain showers' };
  if (code <= 86) return { icon: '🌨️', text: 'Snow showers' };
  return { icon: '⛈️', text: 'Thunderstorm' };
}

export default function WeatherCard({ weather }) {
  const { name, current } = weather;
  const { icon, text } = getConditions(current.weather_code);

  return (
    <div id="weather" className="card">
      <h2 id="place">{name}</h2>
      <div id="icon">{icon}</div>
      <div id="temp">{Math.round(current.temperature_2m)}°C</div>
      <div id="conditions">{text}</div>
      <div className="details">
        <div>Feels like {Math.round(current.apparent_temperature)}°C</div>
        <div>Humidity {current.relative_humidity_2m}%</div>
        <div>Wind {current.wind_speed_10m} km/h</div>
      </div>
    </div>
  );
}
