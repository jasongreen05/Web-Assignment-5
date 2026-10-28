import { useState, useEffect } from 'react';
import { loadWeather, friendly } from './api.js';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import Loading from './components/Loading.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  // runs again whenever city changes
  useEffect(() => {
    if (!city) return;

    async function load() {
      setStatus('loading');
      try {
        setWeather(await loadWeather(city));
        setStatus('ready');
      } catch (err) {
        setError(friendly(err));
        setStatus('error');
      }
    }
    load();
  }, [city]);

  return (
    <>
      <main>
        <h1>Weather Dashboard</h1>
        <SearchBar onSearch={setCity} />

        {status === 'idle' && <p id="status">Search for a city to see its weather.</p>}
        {status === 'loading' && <Loading city={city} />}
        {status === 'error' && <ErrorMessage message={error} />}
        {status === 'ready' && <WeatherCard weather={weather} />}
      </main>

      <footer>
        <p>Weather data by <a href="https://open-meteo.com">Open-Meteo.com</a></p>
      </footer>
    </>
  );
}
