import { translations } from "../i18n/translations";


export default function ClimateInfo({ city, data, lang, setLang }: { city: string; data: any; lang: "en" | "es"; setLang: (lang: "en" | "es") => void }) {
    const times = [{
        text: translations[lang].today, id: "today", temp: data?.current?.temp_c, desc: data?.current?.condition?.text, image: data?.current?.condition?.icon
    }, {
        text: translations[lang].tomorrow, id: "tomorrow", temp: data?.forecast?.forecastday[1]?.day?.avgtemp_c, desc: data?.forecast?.forecastday[1]?.day?.condition?.text, image: data?.forecast?.forecastday[1]?.day?.condition?.icon
    }, {
        text: translations[lang].dayAfterTomorrow, id: "day-after-tomorrow", temp: data?.forecast?.forecastday[2]?.day?.avgtemp_c, desc: data?.forecast?.forecastday[2]?.day?.condition?.text, image: data?.forecast?.forecastday[2]?.day?.condition?.icon
    }];
    return (
        <>
        <div id="clima-info">
            {times.map((time) => (
               <div className="weather-card" id={time.id} key={time.id}>
                   <h3>{time.text}</h3>
                   <img src={time.image} alt={time.text}></img>
                   <p id={`${time.id}-description`}>{time.desc}</p>
                   <p id={`${time.id}-temperature`}>{time.temp} °C</p>
                   <button className="expand-btn" /* onClick={() => toggleHourlyForecast(time.id)} */>{translations[lang].showHourly}</button>
            </div>
            ))}
        </div>
        </>
    );
}