export default function SearchInput({ onSearch }: { onSearch: (city: string) => void }) {
  return (

    <div className="search-box">
    <form>
      <input
        type="text"
        className="search-input"
        id="city-input"
        placeholder="Buscar ciudad..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(e.currentTarget.value);
          }
        }}
      />
        <button type="submit" className="search-btn" aria-label="Buscar">
          <i className='bx bx-search'></i>
        </button>
      </form>
    </div>
  );
}
