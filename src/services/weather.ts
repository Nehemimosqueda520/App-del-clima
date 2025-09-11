export interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: { text: string; icon: string; /* code?: number */ };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: { text: string; icon: string };
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: { text: string; icon: string };
      }>;
    }>;
  };
}

export async function getWeather(city: string, lang: string) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY ?? 'c4b6d68355b64c67840235826230212';
  const q = encodeURIComponent(city);
  const l = encodeURIComponent(lang);

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${q}&days=3&lang=${l}&aqi=no&alerts=no`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error fetching weather: ${res.status} ${res.statusText}`);

  const data = (await res.json()) as WeatherResponse;

  return data;
}

