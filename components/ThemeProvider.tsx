"use client"

import { ThemeContext } from "@/lib/ThemeContext";
import { useEffect, useState } from "react"

export default function ThemeProvider({ children } : { children : React.ReactNode}) {
    const [mounted, setIsMounted] = useState(false);

    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefer-color-scheme:dark)').matches)) {
                return 'dark';
            }
        }
        return 'light';
    })

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
        setIsMounted(true);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}} >
            {children}
        </ThemeContext.Provider>
    )
}