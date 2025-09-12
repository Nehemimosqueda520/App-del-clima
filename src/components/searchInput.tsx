import { translations } from "../languages/translations";

export default function SearchInput({
    onSearch,
    lang,
    setLang,
}: {
    onSearch: (city: string) => void;
    lang: 'en' | 'es';
    setLang: (lang: 'en' | 'es') => void;
}) {
    return (
        <>
            <div className="search-box">
                <form>
                    <input
                        type="text"
                        className="search-input"
                        id="city-input"
                        placeholder= {translations[lang].searchPlaceholder}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                onSearch(e.currentTarget.value);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        className="search-btn"
                        aria-label="Buscar"
                        onClick={(e) => {
                            e.preventDefault();
                            const input = document.getElementById(
                                'city-input'
                            ) as HTMLInputElement;
                            onSearch(input.value);
                        }}
                    >
                        <i className="bx bx-search"></i>
                    </button>
                </form>
            </div>
        </>
    );
}
