import { useState, useEffect } from "react";
import SearchInput from "./searchInput";
import ClimateInfo from "./ClimateInfo";
import { getWeather } from "../services/weather";


export default function WeatherDashboard({
  lang,
  setLang,
}: {
  lang: "en" | "es";
  setLang: (lang: "en" | "es") => void;
}) {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  

  const handleSearch = async (newCity: string) => {
    setCity(newCity);
    try {
      const weatherData = await getWeather(newCity, lang);
      setData(weatherData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchOnLangChange = async () => {
      if (!city) return;
      try {
        const weatherData = await getWeather(city, lang);
        setData(weatherData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOnLangChange();
  }, [lang]);
  
  return (
    <>
      <SearchInput onSearch={handleSearch} lang={lang} setLang={setLang} />
      <ClimateInfo city={city} data={data} lang={lang} setLang={setLang} /> 
    </>
  );
}