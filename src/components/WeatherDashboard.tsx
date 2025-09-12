import { useState, useEffect } from 'react';
import SearchInput from './searchInput';
import ClimateInfo from './climateInfo';
import { getWeather } from '../services/weather';

export default function WeatherDashboard({ lang }: { lang: 'en' | 'es' }) {
    const [city, setCity] = useState('');
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = (newCity: string) => {
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
                setError(error?.message || 'Error fetching weather data');
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
            <SearchInput onSearch={handleSearch} lang={lang} />
            <ClimateInfo
                city={city}
                data={data}
                lang={lang}
                isLoading={isLoading}
                error={error}
            />
        </>
    );
}
