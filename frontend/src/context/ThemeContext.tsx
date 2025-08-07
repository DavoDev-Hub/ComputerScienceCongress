import { createContext, useContext } from "react"
import { useTheme } from "@/hooks/useTheme"

interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => { },
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)

