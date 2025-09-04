export let currentLang = localStorage.getItem('lang') || 'es';

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

export function getLang() {
  return currentLang;
}

const translations = {
  es: {
    searchPlaceholder: 'Buscar ciudad',
    showHourly: 'Mostrar por horas',
    today: 'Hoy',
    tomorrow: 'Mañana',
    dayAfterTomorrow: 'Pasado mañana',
    hourlyWarning: 'Introduce una ciudad para ver el pronóstico por horas.',
    errorGeneric: 'Hubo un error al obtener datos del clima. Por favor, inténtalo de nuevo más tarde.',
    errorFetching: 'No se pudo obtener la información del clima. Inténtalo de nuevo.',
    errorHourlyGeneric: 'Hubo un error al obtener datos del clima por horas. Por favor, inténtalo de nuevo más tarde.',
    errorHourlyFetching: 'No se pudo obtener la información del clima por horas. Inténtalo de nuevo.'
  },
  en: {
    searchPlaceholder: 'Search city',
    showHourly: 'Show hourly',
    today: 'Today',
    tomorrow: 'Tomorrow',
    dayAfterTomorrow: 'Day After Tomorrow',
    hourlyWarning: 'Enter a city to see the hourly forecast.',
    errorGeneric: 'There was an error fetching weather data. Please try again later.',
    errorFetching: 'Could not retrieve weather information. Please try again.',
    errorHourlyGeneric: 'There was an error fetching hourly weather data. Please try again later.',
    errorHourlyFetching: 'Could not retrieve hourly weather information. Please try again.'
  }
};

export function t(key) {
  const langSet = translations[currentLang] || translations.es;
  return langSet[key] || key;
}

export function applyTranslations() {
  const cityInput = document.getElementById('city-input');
  if (cityInput) cityInput.placeholder = t('searchPlaceholder');

  const select = document.getElementById('lang-select');
  if (select) select.value = currentLang;

  const today = document.querySelector('#today h3');
  if (today) today.innerText = t('today');
  const tomorrow = document.querySelector('#tomorrow h3');
  if (tomorrow) tomorrow.innerText = t('tomorrow');
  const dayAfter = document.querySelector('#day-after-tomorrow h3');
  if (dayAfter) dayAfter.innerText = t('dayAfterTomorrow');

  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.innerText = t('showHourly');
  });
}
