import React, { useState } from 'react'
import { CheckSquare, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginScreen() {
  const { registeredUser, rememberedName, setRememberedName, register, login } = useAuth()
  const [name, setName] = useState(registeredUser?.name || rememberedName || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const isSignup = !registeredUser

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      setRememberedName(name.trim())
    }

    if (isSignup) {
      if (password.trim() !== confirmPassword.trim()) {
        setError('Passwords do not match.')
        return
      }

      const ok = register(name, password)
      if (!ok) {
        setError('Enter a name and password to create your account.')
        return
      }

      setError('')
      return
    }

    const ok = login(password)
    if (!ok) {
      setError('Enter the correct password to continue.')
      return
    }

    setError('')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center">
            <CheckSquare size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text">DsaTrack</h1>
            <p className="text-sm text-muted">Track your DSA progress locally</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input"
              autoFocus={isSignup}
            />
          </div>

          {!isSignup ? (
            <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted">
              Welcome back{registeredUser?.name ? `, ${registeredUser.name}` : ''}. Enter your password to continue.
            </div>
          ) : null}

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input"
            />
          </div>

          {isSignup ? (
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="input"
              />
            </div>
          ) : null}

          {error ? <p className="text-sm text-danger">{error}</p> : null}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-base font-medium text-white hover:opacity-90 transition-opacity"
          >
            {isSignup ? <UserPlus size={18} /> : <LogIn size={18} />}
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}