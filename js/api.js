import { getLang } from './lang.js';

const apiKey = 'c4b6d68355b64c67840235826230212';

export async function fetchWeatherForecast(city, days = 3) {
  const lang = getLang();
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&lang=${lang}`);
  return response.json();
}

export async function fetchCurrentWeatherByCoords(lat, lon) {
  const lang = getLang();
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=${lang}`);
  return response.json();
}
