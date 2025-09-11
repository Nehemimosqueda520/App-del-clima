import { getWeather } from "../services/weather";

export default function SearchInput({ onSearch, lang, setLang }: { onSearch: (city: string) => void, lang: "en" | "es", setLang: (lang: "en" | "es") => void }) {
  return (
    <>

    <div className="search-box">
    <form>
      <input
        type="text"
        className="search-input"
        id="city-input"
        placeholder="Buscar ciudad..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            getWeather(e.currentTarget.value, lang);
          }
        }}
      />
        <button type="submit" className="search-btn" aria-label="Buscar" onClick={(e) => {
          e.preventDefault();
          const input = document.getElementById("city-input") as HTMLInputElement;
          onSearch(input.value);
          getWeather(input.value, lang);
        }}>
          <i className='bx bx-search'></i>
        </button>
      </form>
    </div>
    </>
  );
}
