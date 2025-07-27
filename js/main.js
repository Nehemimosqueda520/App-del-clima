import { searchWeather, getWeatherByUserLocation, toggleHourlyForecast, setWeatherIcon, loadCityHistory } from './ui.js';
import { applySavedTheme, toggleTheme } from './toggleTheme.js';
import { applyTranslations, setLang } from './lang.js';

window.searchWeather = searchWeather;
window.toggleHourlyForecast = toggleHourlyForecast;

window.onload = () => {
  getWeatherByUserLocation();
  setWeatherIcon();
  applySavedTheme();
  loadCityHistory();
  applyTranslations();
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      setLang(e.target.value);
      applyTranslations();
      searchWeather();
    });
  }
};
