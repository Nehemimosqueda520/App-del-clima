
 import { useState, useEffect } from "react";
 import SearchInput from "./searchInput";
 import ClimateInfo from "./climateInfo";
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

  const handleSearch = (newCity: string) => {
    // Updating the city triggers the effect below which fetches the data
    // using the currently selected language.
    setCity(newCity);
  };

   useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
       try {
         const weatherData = await getWeather(city, lang);
         setData(weatherData);
       } catch (error) {
         console.error(error);
       }
     };

    fetchWeather();
  }, [city, lang]);
   
   return (
     <>
       <SearchInput onSearch={handleSearch} lang={lang} setLang={setLang} />
       <ClimateInfo city={city} data={data} lang={lang} setLang={setLang} /> 
     </>
   );
 }
