import { searchWeather, getWeatherByUserLocation, toggleHourlyForecast, setWeatherIcon } from './ui.js';

window.searchWeather = searchWeather;
window.toggleHourlyForecast = toggleHourlyForecast;

function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.classList.replace('bx-moon', 'bx-sun');
    }
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.classList.toggle('bx-moon', !isDark);
    icon.classList.toggle('bx-sun', isDark);
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

window.onload = () => {
  getWeatherByUserLocation();
  setWeatherIcon();
  applySavedTheme();
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }
};
