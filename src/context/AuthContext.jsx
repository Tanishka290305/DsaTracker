import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const AUTH_KEY = 'dsatrack_auth_user'
const CURRENT_USER_KEY = 'dsatrack_current_user'
const REMEMBERED_NAME_KEY = 'dsatrack_remembered_name'

function loadUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [registeredUser, setRegisteredUser] = useState(() => {
    if (typeof window === 'undefined') return null
    return loadUser()
  })
  const [rememberedName, setRememberedName] = useState(() => {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem(REMEMBERED_NAME_KEY) || ''
  })
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (registeredUser) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(registeredUser))
      if (!rememberedName) {
        setRememberedName(registeredUser.name)
      }
    } else {
      localStorage.removeItem(AUTH_KEY)
    }
  }, [registeredUser, rememberedName])

  useEffect(() => {
    if (rememberedName) {
      localStorage.setItem(REMEMBERED_NAME_KEY, rememberedName)
    } else {
      localStorage.removeItem(REMEMBERED_NAME_KEY)
    }
  }, [rememberedName])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }, [currentUser])

  const register = (name, password) => {
    const trimmedName = name.trim()
    const trimmedPassword = password.trim()
    if (!trimmedName || !trimmedPassword) return false
    const account = { name: trimmedName, password: trimmedPassword }
    setRegisteredUser(account)
    setRememberedName(trimmedName)
    setCurrentUser({ name: trimmedName })
    return true
  }

  const login = (password) => {
    if (!registeredUser) return false
    if (password.trim() !== registeredUser.password) return false
    setCurrentUser({ name: rememberedName || registeredUser.name })
    return true
  }

  const logout = () => setCurrentUser(null)

  return (
    <AuthContext.Provider
      value={{ currentUser, registeredUser, rememberedName, setRememberedName, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}