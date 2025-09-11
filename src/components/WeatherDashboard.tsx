import { useState } from "react";
import SearchInput from "./searchInput";
import ClimateInfo from "./ClimateInfo";


export default function WeatherDashboard( { lang, setLang }: { lang: "en" | "es"; setLang: (lang: "en" | "es") => void }  ) {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  ;

/*   useEffect(() => {
    if (!city) return;
    getWeather(city, "es").then(setData).catch(console.error);
  }, [city]); */

  return (
    <> 
     <SearchInput onSearch={setCity} lang={lang} setLang={setLang} />
     <ClimateInfo city={city} data={data} lang={lang} setLang={setLang} />
    </>
  );
}