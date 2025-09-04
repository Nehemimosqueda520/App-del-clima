import { useState, useEffect } from "react";
import { getWeather } from "../services/weather";
import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!city) return;
    getWeather(city, "es").then(setData).catch(console.error);
  }, [city]);

  return (
    <>
      <SearchBar onSearch={setCity} />
      {data && <WeatherCard data={data} />}
    </>
  );
}