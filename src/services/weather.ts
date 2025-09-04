export interface WeatherResponse { /* ...campos necesarios... */ }

export async function getWeather(city: string, lang: string) {
  const res = await fetch(`/weather?city=${city}&lang=${lang}`);
  if (!res.ok) throw new Error("Error fetching weather");
  return (await res.json()) as WeatherResponse;
}