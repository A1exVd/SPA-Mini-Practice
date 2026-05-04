import { Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import Button from "./Button";

export default function Header() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className="header">
            <h1>🎓SPA Mini Practice</h1>
            <Button className="theme-btn" onClick={toggleTheme}>
                {
                 darkMode 
                    ? <Sun size={24} display="block" color="white"/>
                    : <Moon size={24} display="block" color="white"/>
                }
            </Button>
        </div>
    )
}

<Moon />