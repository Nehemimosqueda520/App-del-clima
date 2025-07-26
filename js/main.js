import { searchWeather, getWeatherByUserLocation, toggleHourlyForecast, setWeatherIcon } from './ui.js';

window.searchWeather = searchWeather;
window.toggleHourlyForecast = toggleHourlyForecast;

window.onload = () => {
  getWeatherByUserLocation();
  setWeatherIcon();
};
