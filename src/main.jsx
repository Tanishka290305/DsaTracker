import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProblemProvider } from './context/ProblemContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ProblemProvider>
          <App />
        </ProblemProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
