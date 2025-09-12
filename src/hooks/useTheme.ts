import { useEffect, useState } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(
        (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    );
    useEffect(() => {
        document.body.className = `${theme}-mode`;
    }, [theme]);
    return {
        theme,
        setTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    };
}
