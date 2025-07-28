import { fetchWeatherForecast, fetchCurrentWeatherByCoords } from './api.js';
import { t } from './lang.js';
import { showToast } from './toast.js';

const footer = document.getElementById('footer');

export async function searchWeather() {
  const cityInput = document.getElementById('city-input').value;
  try {
    const data = await fetchWeatherForecast(cityInput);
    if (data.error) {
      showToast(t('errorFetching'), 'error');
      return;
    }
    updateWeatherCards(data);
    saveCityToHistory(cityInput);
  } catch (error) {
    console.error('Hubo un error al obtener datos del clima:', error);
    showToast(t('errorGeneric'), 'error');
  }
}

export async function getWeatherByUserLocation() {
  try {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async position => {
        const data = await fetchCurrentWeatherByCoords(position.coords.latitude, position.coords.longitude);
        document.getElementById('city-input').value = data.location.name;
        searchWeather();
      });
    } else {
      console.error('Geolocalización no está disponible en este navegador.');
    }
  } catch (error) {
    console.error('Hubo un error al obtener la ubicación del usuario:', error);
  }
}

function updateWeatherCards(data) {
  document.getElementById('today-description').innerText = data.forecast.forecastday[0].day.condition.text;
  document.getElementById('tomorrow-description').innerText = data.forecast.forecastday[1].day.condition.text;
  document.getElementById('day-after-tomorrow-description').innerText = data.forecast.forecastday[2].day.condition.text;

  document.getElementById('today').getElementsByTagName('img')[0].src = data.forecast.forecastday[0].day.condition.icon;
  document.getElementById('tomorrow').getElementsByTagName('img')[0].src = data.forecast.forecastday[1].day.condition.icon;
  document.getElementById('day-after-tomorrow').getElementsByTagName('img')[0].src = data.forecast.forecastday[2].day.condition.icon;

  document.getElementById('today-temperature').innerText = data.forecast.forecastday[0].day.avgtemp_c + '°C';
  document.getElementById('tomorrow-temperature').innerText = data.forecast.forecastday[1].day.avgtemp_c + '°C';
  document.getElementById('day-after-tomorrow-temperature').innerText = data.forecast.forecastday[2].day.avgtemp_c + '°C';
}

export async function toggleHourlyForecast(cardId) {
  const existingCard = document.getElementById(`${cardId}-hourly-card`);
  const container = document.getElementById('hourly-cards');

  if (existingCard) {
    existingCard.remove();
    if (!container.hasChildNodes()) {
      footer.classList.add('absolute');
    }
    return;
  }

  const city = document.getElementById('city-input').value.trim();
  if (!city) {
    showToast(t('hourlyWarning'), 'warning');
    return;
  }

  const index = cardId === 'today' ? 0 : cardId === 'tomorrow' ? 1 : 2;
  const hourlyForecast = await getHourlyForecast(city, index);

  if (hourlyForecast) {
    const hourlyForecastContent = hourlyForecast.map(hour => {
      return `
        <div class="hourly-weather">
          <span class="hourly-time">${hour.time.slice(11, 16)}</span>
          <img src="${hour.condition.icon}" alt="${hour.condition.text}">
          <span class="hourly-temp">${hour.temp_c}°C</span>
        </div>
      `;
    }).join('');

    const hourlyCard = document.createElement('div');
    hourlyCard.className = 'weather-card hourly-card';
    hourlyCard.id = `${cardId}-hourly-card`;
    hourlyCard.innerHTML = `<div class="hourly-forecast">${hourlyForecastContent}</div>`;

    container.appendChild(hourlyCard);
    footer.classList.remove('absolute');
  }
}

async function getHourlyForecast(city, index) {
  try {
    const data = await fetchWeatherForecast(city, index + 1);
    if (data.error) {
      showToast(t('errorHourlyFetching'), 'error');
      return null;
    }
    return data.forecast.forecastday[index].hour;
  } catch (error) {
    console.error('Hubo un error al obtener datos del clima por horas:', error);
    showToast(t('errorHourlyGeneric'), 'error');
    return null;
  }
}

export function setWeatherIcon() {
  try {
    const weatherData = { condition: 'sunny' };
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';

    if (weatherData.condition === 'sunny') {
      link.href = 'images/sun.png';
    } else {
      link.href = 'https://example.com/icons/cloud.png';
    }
    document.head.appendChild(link);
  } catch (error) {
    console.error('Error obteniendo el clima:', error);
  }
}

export function loadCityHistory() {
  renderCityHistory();
}

function saveCityToHistory(city) {
  const trimmed = city.trim();
  if (!trimmed) return;
  let cities = JSON.parse(localStorage.getItem('recentCities')) || [];
  cities = cities.filter(c => c.toLowerCase() !== trimmed.toLowerCase());
  cities.unshift(trimmed);
  if (cities.length > 5) {
    cities = cities.slice(0, 5);
  }
  localStorage.setItem('recentCities', JSON.stringify(cities));
  renderCityHistory();
}

function renderCityHistory() {
  const container = document.getElementById('recent-cities');
  if (!container) return;
  const cities = JSON.parse(localStorage.getItem('recentCities')) || [];
  container.innerHTML = '';
  cities.forEach(city => {
    const wrapper = document.createElement('div');
    wrapper.className = 'recent-city';

    const btn = document.createElement('button');
    btn.className = 'city-name';
    btn.textContent = city;
    btn.addEventListener('click', () => {
      document.getElementById('city-input').value = city;
      searchWeather();
    });

    const close = document.createElement('button');
    close.className = 'close-btn';
    close.innerHTML = '<i class="bx bx-x"></i>';
    close.addEventListener('click', (e) => {
      e.stopPropagation();
      removeCityFromHistory(city);
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(close);
    container.appendChild(wrapper);
  });
}

function removeCityFromHistory(city) {
  let cities = JSON.parse(localStorage.getItem('recentCities')) || [];
  cities = cities.filter(c => c.toLowerCase() !== city.toLowerCase());
  localStorage.setItem('recentCities', JSON.stringify(cities));
  renderCityHistory();
}
