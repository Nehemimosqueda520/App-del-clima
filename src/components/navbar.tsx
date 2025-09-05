import { useTheme } from "../hooks/useTheme";

type NavbarProps = {
  theme: "light" | "dark";
  setTheme: () => void;
};


export default function Navbar({ theme, setTheme }: NavbarProps) {


  return (
    <>
    <nav className="navbar">
         <div className="toggle-mode">
            <div className="logo">ClimAPP</div>
            <select id="lang-select" aria-label="Idioma">
                <option value="es">ES</option>
                <option value="en">EN</option>
                
            </select>
            <button id="theme-toggle" aria-label="Cambiar tema" onClick={setTheme}>
                <i id="theme-icon" className={`bx ${theme === "dark" ? "bx-sun" : "bx-moon"}`}></i>
            </button>
        </div>
      
    </nav>
    </>
  );
}
