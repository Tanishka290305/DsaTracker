import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)
const THEME_KEY = 'dsatrack_theme'

function loadInitialTheme() {
  if (typeof window === 'undefined') return 'dark'

  const storedTheme = localStorage.getItem(THEME_KEY)
  const initialTheme = storedTheme || 'dark'
  document.documentElement.dataset.theme = initialTheme
  return initialTheme
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(loadInitialTheme)

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}