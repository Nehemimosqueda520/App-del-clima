import { searchWeather, getWeatherByUserLocation, toggleHourlyForecast, setWeatherIcon, loadCityHistory } from './ui.js';
import { applySavedTheme, toggleTheme } from './toggleTheme.js';

window.searchWeather = searchWeather;
window.toggleHourlyForecast = toggleHourlyForecast;

window.onload = () => {
  getWeatherByUserLocation();
  setWeatherIcon();
  applySavedTheme();
  loadCityHistory();
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }
};
