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
  const container = document.getElementById('clima-info');
  container.innerHTML = '';
  data.forecast.forecastday.forEach((day, index) => {
    const card = document.createElement('div');
    card.className = 'weather-card swiper-slide';
    card.id = `day-${index}`;
    const title = index === 0 ? 'Hoy' : index === 1 ? 'Mañana' : day.date;
    card.innerHTML = `
      <h3>${title}</h3>
      <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
      <p id="day-${index}-description">${day.day.condition.text}</p>
      <p id="day-${index}-temperature">${day.day.avgtemp_c}°C</p>
      <button class="expand-btn" onclick="toggleHourlyForecast(${index})">Mostrar por horas</button>
      <div class="hourly-forecast" id="hourly-${index}"></div>
    `;
    container.appendChild(card);
  });

  if (window.mySwiper) {
    window.mySwiper.update();
  } else {
    window.mySwiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}

export async function toggleHourlyForecast(index) {
  const card = document.getElementById(`day-${index}`);
  const hourlyForecastDiv = card.querySelector('.hourly-forecast');
  const icon = card.querySelector('img');
  const expandBtn = card.querySelector('.expand-btn');

  if (hourlyForecastDiv.style.display === 'block') {
    hourlyForecastDiv.style.display = 'none';
    footer.classList.add('absolute');
    icon.style.display = '';
    expandBtn.style.display = '';
    const collapse = hourlyForecastDiv.querySelector('.collapse-btn');
    if (collapse) {
      collapse.remove();
    }
  } else {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
      alert('Introduce una ciudad para ver el pronóstico por horas.');
      return;
    }

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
      const collapseBtn = document.createElement('button');
      collapseBtn.className = 'collapse-btn';
      collapseBtn.textContent = 'Mostrar d\u00eda';
      collapseBtn.onclick = () => toggleHourlyForecast(index);
      hourlyForecastDiv.prepend(collapseBtn);

      hourlyForecastDiv.style.display = 'block';
      footer.classList.remove('absolute');
      icon.style.display = 'none';
      expandBtn.style.display = 'none';
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
