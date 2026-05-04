import { useState, useEffect, createContext, useContext} from "react"

const ThemeContext = createContext();

/* 
    Преимущества использование createContext
    * Глобальный доступ (избегаем props drilling)
    * Удобство (данные доступны для любого вложенного компонента)
    * Автоматическое обновление
*/

export function ThemeProvider({ children }) {
    const [ darkMode, setDarkMode ] = useState(false);

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    }

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme", 
            darkMode ? "dark": "light"
        );
    }, [darkMode])

    return (
        <ThemeContext value={{ darkMode, toggleTheme }} >
            {children}
        </ThemeContext>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}