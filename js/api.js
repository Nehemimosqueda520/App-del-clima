const apiKey = 'c4b6d68355b64c67840235826230212';
const lang = 'es';

export async function fetchWeatherForecast(city, days = 3) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&lang=${lang}`);
  return response.json();
}

export async function fetchCurrentWeatherByCoords(lat, lon) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=${lang}`);
  return response.json();
}
