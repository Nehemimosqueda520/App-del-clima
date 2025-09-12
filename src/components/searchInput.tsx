import { translations } from "../languages/translations";
import { useState } from "react";

export default function SearchInput({
    onSearch,
    lang,
    setLang,
}: {
    onSearch: (city: string) => void;
    lang: 'en' | 'es';
    setLang: (lang: 'en' | 'es') => void;
}) {
    const [error, setError] =useState<string>('');
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
                                 const value = e.currentTarget.value;
                                if (!value.trim()) {
                                    setError(translations[lang].emptyCity);
                                    return;
                                }
                                setError("");
                                onSearch(value);
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
                             const value = input.value;
                            if (!value.trim()) {
                                setError(translations[lang].emptyCity);
                                return;
                            }
                            setError("");
                            onSearch(value);
                        }}
                    >
                        <i className="bx bx-search"></i>
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    );
}
