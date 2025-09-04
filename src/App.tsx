import WeatherDashboard from "./components/WeatherDashboard";
import { useTheme } from "./hooks/useTheme";
import React from "react";


export default class App extends React.Component {
  render() {
    const { theme, toggle } = useTheme();
    return (
      <div>
        <button onClick={toggle}>Toggle Theme</button>
        <h1>Hola</h1>
        <WeatherDashboard />
      </div>
    );
  }
}