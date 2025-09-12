
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
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

  const handleSearch = (newCity: string) => {
    // Updating the city triggers the effect below which fetches the data
    // using the currently selected language.
    setCity(newCity);
  };

   useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
       setIsLoading(true);
       setError(null);
       try {
         const weatherData = await getWeather(city, lang);
         setData(weatherData);
       } catch (error: any) {
         setError(error?.message || "Error fetching weather data");
         setData(null);
         console.error(error);
       } finally {
         setIsLoading(false);
       }
     };

    fetchWeather();
  }, [city, lang]);
   
   return (
     <>
       <SearchInput onSearch={handleSearch} lang={lang} setLang={setLang} />
       <ClimateInfo
         city={city}
         data={data}
         lang={lang}
         setLang={setLang}
         isLoading={isLoading}
         error={error}
       /> 
     </>
   );
 }
