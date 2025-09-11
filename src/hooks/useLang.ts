import { useEffect, useState } from "react";

export function useLang() {
  const [lang, setLang] = useState<"en" | "es">(
    localStorage.getItem("lang") as "en" | "es" || "en"
  );
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return { lang, setLang };
}