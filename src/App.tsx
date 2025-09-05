import WeatherDashboard from "./components/WeatherDashboard";
import Navbar from "./components/Navbar";
import { useTheme } from "./hooks/useTheme";
import React from "react";


export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Navbar theme={theme} toggle={toggle} />
      <WeatherDashboard />
    </>
    );
  }

