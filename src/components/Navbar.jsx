import React from 'react'
import { CheckSquare, LogOut, MoonStar, SunMedium } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { currentUser, logout } = useAuth()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-l bg-primary flex items-center justify-center">
          <CheckSquare size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold text-text">DsaTrack</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-sm text-muted">
          {currentUser?.name ? `Hi, ${currentUser.name}` : ''}
        </div>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-base text-white hover:opacity-90 transition-opacity"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <MoonStar size={18} /> : <SunMedium size={18} />}
          <span className="hidden sm:inline">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-base text-text transition-colors hover:border-primary"
          aria-label="Log out"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}
