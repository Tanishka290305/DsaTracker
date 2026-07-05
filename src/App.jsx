import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Stats from './components/Stats.jsx'
import FilterBar from './components/FilterBar.jsx'
import ProblemList from './components/ProblemList.jsx'
import AddProblem from './components/AddProblem.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import RevisionReminders from './components/RevisionReminders.jsx'
import { useAuth } from './context/AuthContext.jsx'

export default function App() {
  const { currentUser } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProblem, setEditingProblem] = useState(null)
  const [filters, setFilters] = useState({ tab: 'All', topic: '', pattern: '', search: '' })

  const openAdd = () => {
    setEditingProblem(null)
    setModalOpen(true)
  }

  const openEdit = (problem) => {
    setEditingProblem(problem)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingProblem(null)
  }

  if (!currentUser) {
    return <LoginScreen />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <RevisionReminders />
      <Stats />
      <FilterBar filters={filters} setFilters={setFilters} onAddClick={openAdd} />
      <ProblemList filters={filters} onEdit={openEdit} onAddClick={openAdd} />

      {modalOpen && <AddProblem editingProblem={editingProblem} onClose={closeModal} />}
    </div>
  )
}
