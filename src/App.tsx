import WeatherDashboard from "./components/WeatherDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";
import { useLang } from "./hooks/useLang";


export default function App() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  localStorage.setItem("theme", theme);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />
      <WeatherDashboard lang={lang} setLang={setLang} />
      <Footer />
    </>
    );
  }

