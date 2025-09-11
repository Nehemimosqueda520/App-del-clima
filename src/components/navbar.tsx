type NavbarProps = {
  theme: "light" | "dark";
  setTheme: () => void;
  lang: "en" | "es";
  setLang: (lang: "en" | "es") => void;
};


export default function Navbar({ theme, setTheme, lang, setLang }: NavbarProps) {
  return (
    <>
    <nav className="navbar">
         <div className="toggle-mode">
            <div className="logo">ClimAPP</div>
            <select id="lang-select" aria-label="Idioma" value={lang} onChange={e => setLang(e.target.value as "en" | "es")}>
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
