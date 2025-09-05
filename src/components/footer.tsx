export default function Footer() {
    return (
        <>
            <footer id="footer" className="absolute">
                <h4>Created by Nehemias Mosqueda ©</h4>

                <h4 id="api-link">Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></h4>

                <a  id="api-image" href="https://www.weatherapi.com/" title="Free Weather API">
                    <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" />
                </a>
            </footer>
        </>
    );
}