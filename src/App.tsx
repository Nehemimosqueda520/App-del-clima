import WeatherDashboard from "./components/WeatherDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";
import React from "react";


export default function App() {
  const { theme, setTheme } = useTheme();
  localStorage.setItem("theme", theme);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <WeatherDashboard />
      <Footer />
    </>
    );
  }

