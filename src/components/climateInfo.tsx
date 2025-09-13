import { translations } from '../languages/translations';

interface Props {
    city: string;
    data: any;
    lang: 'en' | 'es';
    isLoading: boolean;
    error: string | null;
}

export default function ClimateInfo({
    city,
    data,
    lang,
    isLoading,
    error,
}: Props) {
    if (error) {
        return (
            <div className="weather-card center">
                <h3>{translations[lang].error}</h3>
                <p>{error}</p>
                <h3>
                    <i className="bx bx-error big-icon error-icon"> </i>
                </h3>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="weather-card center">
                <h3>{translations[lang].loading}</h3>
                <i className="bx bx-loader-circle bx-spin big-icon"></i>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="weather-card center">
                <h3>{translations[lang].welcome}</h3>
                <p>{translations[lang].noData}</p>
                <h3>
                    <i className="bx bx-building-house big-icon"> </i>
                </h3>
            </div>
        );
    }

    const times = [
        {
            text: translations[lang].today,
            id: 'today',
            temp: data?.current?.temp_c,
            desc: data?.current?.condition?.text,
            image: data?.current?.condition?.icon,
            wind: data?.current?.wind_kph,
            humidity: data?.current?.humidity,
        },
        {
            text: translations[lang].tomorrow,
            id: 'tomorrow',
            temp: data?.forecast?.forecastday[1]?.day?.avgtemp_c,
            desc: data?.forecast?.forecastday[1]?.day?.condition?.text,
            image: data?.forecast?.forecastday[1]?.day?.condition?.icon,
            wind: data?.forecast?.forecastday[1]?.day?.maxwind_kph,
            humidity: data?.forecast?.forecastday[1]?.day?.avghumidity,
        },
        {
            text: translations[lang].dayAfterTomorrow,
            id: 'day-after-tomorrow',
            temp: data?.forecast?.forecastday[2]?.day?.avgtemp_c,
            wind: data?.forecast?.forecastday[2]?.day?.maxwind_kph,
            humidity: data?.forecast?.forecastday[2]?.day?.avghumidity,
            desc: data?.forecast?.forecastday[2]?.day?.condition?.text,
            image: data?.forecast?.forecastday[2]?.day?.condition?.icon,
        },
    ];

    return (
        <div id="clima-info">
            {times.map((time) => (
                <div className="weather-card" id={time.id} key={time.id}>
                    <h3>{time.text}</h3>
                    <img src={time.image} alt={time.text} />
                    <p id={`${time.id}-description`}>{time.desc}</p>
                    <p id={`${time.id}-temperature`}>
                        <i className="bx bx-thermometer"> </i>
                        {time.temp} °C
                    </p>
                    <p id={`${time.id}-wind`}>
                        <i className="bx bx-wind"> </i>
                        {time.wind} kph
                    </p>
                    <p id={`${time.id}-humidity`}>
                        <i className="bx bx-droplet"> </i>
                        {time.humidity} %
                    </p>
                </div>
            ))}
        </div>
    );
}
