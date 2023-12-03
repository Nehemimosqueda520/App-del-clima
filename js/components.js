
async function searchWeather() {
  const apiKey = 'c4b6d68355b64c67840235826230212'; 
  const cityInput = document.getElementById('city-input').value;
  const lang = 'es';
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityInput}&days=3&lang=${lang}`);
    const data = await response.json();

      // Verificar si se obtuvieron datos correctamente
      if (data.error) {
          alert('No se pudo obtener la información del clima. Inténtalo de nuevo.');
          return;
      }

      // Mostrar información del clima en los elementos HTML correspondientes
      document.getElementById('today-description').innerText = data.forecast.forecastday[0].day.condition.text;
      document.getElementById('tomorrow-description').innerText = data.forecast.forecastday[1].day.condition.text;
      document.getElementById('day-after-tomorrow-description').innerText = data.forecast.forecastday[2].day.condition.text;

      // Actualizar las imágenes según el clima (necesitarás manejar esto dependiendo de la API que utilices)
      // data.forecast.forecastday[0].day.condition.icon puede ser la URL de la imagen para el clima actual, por ejemplo

      // Ejemplo de cómo podrías usar la URL de la imagen proporcionada por la API
      document.getElementById('today').getElementsByTagName('img')[0].src = data.forecast.forecastday[0].day.condition.icon;
      document.getElementById('tomorrow').getElementsByTagName('img')[0].src = data.forecast.forecastday[1].day.condition.icon;
      document.getElementById('day-after-tomorrow').getElementsByTagName('img')[0].src = data.forecast.forecastday[2].day.condition.icon;

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

              const apiKey = 'c4b6d68355b64c67840235826230212'; // Reemplaza 'TU_API_KEY' con tu clave de API de Weather API

              const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
              const data = await response.json();

              document.getElementById('city-input').value = data.location.name;

              // Mostrar información del clima
              // ...

              // Llamar a la función searchWeather para cargar los datos del clima por defecto
              searchWeather();
          });
      } else {
          console.error('Geolocalización no está disponible en este navegador.');
      }
  } catch (error) {
      console.error('Hubo un error al obtener la ubicación del usuario:', error);
  }
}

// Llamar a la función para obtener el clima por la ubicación del usuario al cargar la página
window.onload = getWeatherByUserLocation;

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Obtenemos los elementos de los iconos
  const darkIcon = document.getElementById('dark-icon');
  const lightIcon = document.getElementById('light-icon');

  // Alternamos la visibilidad de los iconos
  darkIcon.style.display = darkIcon.style.display === 'none' ? 'block' : 'none';
  lightIcon.style.display = lightIcon.style.display === 'none' ? 'block' : 'none';
}