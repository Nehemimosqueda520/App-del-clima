import { fetchWeatherForecast, fetchCurrentWeatherByCoords } from './api.js';

const footer = document.getElementById('footer');

export async function searchWeather() {
  const cityInput = document.getElementById('city-input').value;
  try {
    const data = await fetchWeatherForecast(cityInput);
    if (data.error) {
      alert('No se pudo obtener la información del clima. Inténtalo de nuevo.');
      return;
    }
    updateWeatherCards(data);
  } catch (error) {
    console.error('Hubo un error al obtener datos del clima:', error);
    alert('Hubo un error al obtener datos del clima. Por favor, inténtalo de nuevo más tarde.');
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
  const card = document.getElementById(cardId);
  const hourlyForecastDiv = card.querySelector('.hourly-forecast');

  if (hourlyForecastDiv.style.display === 'block') {
    hourlyForecastDiv.style.display = 'none';
    footer.classList.add('absolute');
  } else {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
      alert('Introduce una ciudad para ver el pronóstico por horas.');
      return;
    }

    const index = cardId === 'today' ? 0 : cardId === 'tomorrow' ? 1 : 2;
    const hourlyForecast = await getHourlyForecast(city, index);

    if (hourlyForecast) {
      const hourlyForecastContent = hourlyForecast.map(hour => {
        return `
          <div class="hourly-weather">
            <hr>
            <h3>${hour.time.slice(11, 16)}</h3>
            <img src="${hour.condition.icon}" alt="${hour.condition.text}">
            <p>${hour.condition.text}</p>
            <p>${hour.temp_c}°C</p>
          </div>
        `;
      }).join('');

      hourlyForecastDiv.innerHTML = hourlyForecastContent;
      hourlyForecastDiv.style.display = 'block';
      footer.classList.remove('absolute');
    }
  }
}

async function getHourlyForecast(city, index) {
  try {
    const data = await fetchWeatherForecast(city, index + 1);
    if (data.error) {
      alert('No se pudo obtener la información del clima por horas. Inténtalo de nuevo.');
      return null;
    }
    return data.forecast.forecastday[index].hour;
  } catch (error) {
    console.error('Hubo un error al obtener datos del clima por horas:', error);
    alert('Hubo un error al obtener datos del clima por horas. Por favor, inténtalo de nuevo más tarde.');
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
