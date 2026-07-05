import React, { useMemo } from 'react'
import { Search } from 'lucide-react'
import { useProblems } from '../context/ProblemContext.jsx'
import ProblemCard from './ProblemCard.jsx'

export default function ProblemList({ filters, onEdit, onAddClick }) {
  const { problems } = useProblems()
  const { tab, topic, pattern, search } = filters

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (tab === 'Solved' && p.status !== 'Solved') return false
      if (tab === 'Pending' && p.status !== 'Pending') return false
      if (tab === 'Revision' && !p.needsRevision) return false
      if (topic && p.topic !== topic) return false
      if (pattern && p.pattern !== pattern) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [problems, tab, topic, pattern, search])

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <div className="w-16 h-16 rounded-l bg-card border border-border flex items-center justify-center mb-4">
          <Search size={26} className="text-muted" />
        </div>
        <h3 className="text-xl font-semibold text-text">No problems found</h3>
        <p className="text-base text-muted mt-1 max-w-sm">
          {problems.length === 0
            ? 'Add your first problem to start tracking your DSA progress.'
            : 'No problems match your current filters. Try adjusting them or add a new problem.'}
        </p>
        <button
          onClick={onAddClick}
          className="mt-5 bg-primary text-white px-4 py-2 rounded-l text-base font-medium hover:opacity-90 transition-opacity"
        >
          + Add Problem
        </button>
      </div>
    )
  }

  return (
    <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} onEdit={onEdit} />
      ))}
    </div>
  )
}
