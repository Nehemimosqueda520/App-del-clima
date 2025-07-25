const footer = document.getElementById('footer');

async function searchWeather() {
  const apiKey = 'c4b6d68355b64c67840235826230212'; 
  const cityInput = document.getElementById('city-input').value;
  const lang = 'es';
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityInput}&days=3&lang=${lang}`);
    const data = await response.json();

      if (data.error) {
          alert('No se pudo obtener la información del clima. Inténtalo de nuevo.');
          return;
      }

      document.getElementById('today-description').innerText = data.forecast.forecastday[0].day.condition.text;
      document.getElementById('tomorrow-description').innerText = data.forecast.forecastday[1].day.condition.text;
      document.getElementById('day-after-tomorrow-description').innerText = data.forecast.forecastday[2].day.condition.text;

      document.getElementById('today').getElementsByTagName('img')[0].src = data.forecast.forecastday[0].day.condition.icon;
      document.getElementById('tomorrow').getElementsByTagName('img')[0].src = data.forecast.forecastday[1].day.condition.icon;
      document.getElementById('day-after-tomorrow').getElementsByTagName('img')[0].src = data.forecast.forecastday[2].day.condition.icon;

      document.getElementById('today-temperature').innerText = data.forecast.forecastday[0].day.avgtemp_c + '°C';
document.getElementById('tomorrow-temperature').innerText = data.forecast.forecastday[1].day.avgtemp_c + '°C';
document.getElementById('day-after-tomorrow-temperature').innerText = data.forecast.forecastday[2].day.avgtemp_c + '°C';

  } catch (error) {
      console.error('Hubo un error al obtener datos del clima:', error);
      alert('Hubo un error al obtener datos del clima. Por favor, inténtalo de nuevo más tarde.');
  }
}

async function getWeatherByUserLocation() {
  try {
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async function(position) {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              const apiKey = 'c4b6d68355b64c67840235826230212'; 

              const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
              const data = await response.json();

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

window.onload = getWeatherByUserLocation;

async function getHourlyForecast(city, index) {
  const apiKey = 'c4b6d68355b64c67840235826230212';
  const lang = 'es';

  try {
      const days = index + 1;
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&lang=${lang}`);
      const data = await response.json();

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

// Función para mostrar u ocultar el pronóstico por horas al hacer clic en la flecha
async function toggleHourlyForecast(cardId) {
  const card = document.getElementById(cardId);
  const hourlyForecastDiv = card.querySelector('.hourly-forecast');

  if (hourlyForecastDiv.style.display === 'block') {
    hourlyForecastDiv.style.display = 'none';
    footer.classList.add('absolute')
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

  setWeatherIcon();

  async function setWeatherIcon() {
    try {
        // Simulación de respuesta de la API
        const weatherData = { condition: "sunny" }; // Puedes cambiarlo dinámicamente

        // Crear el elemento <link> para el favicon
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/png";

        // Definir la imagen del ícono dependiendo del clima
        if (weatherData.condition === "sunny") {
            link.href = "images/sun.png"; // URL del ícono del sol
        } else {
            link.href = "https://example.com/icons/cloud.png"; // Otro ícono de clima
        }

        // Agregar el <link> al <head>
        document.head.appendChild(link);
    } catch (error) {
        console.error("Error obteniendo el clima:", error);
    }
}




