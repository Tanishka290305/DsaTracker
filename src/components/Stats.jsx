import React, { useMemo } from 'react'
import { useProblems } from '../context/ProblemContext.jsx'

export default function Stats() {
  const { problems } = useProblems()

  const stats = useMemo(() => {
    const total = problems.length
    const solved = problems.filter((p) => p.status === 'Solved').length
    const pending = problems.filter((p) => p.status === 'Pending').length
    const revision = problems.filter((p) => p.needsRevision).length
    return { total, solved, pending, revision }
  }, [problems])

  const cards = [
    { label: 'Total Problems', value: stats.total, color: 'text-text' },
    { label: 'Solved', value: stats.solved, color: 'text-primary' },
    { label: 'Pending', value: stats.pending, color: 'text-warning' },
    { label: 'Needs Revision', value: stats.revision, color: 'text-danger' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pt-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-card border border-border rounded-l px-5 py-4 shadow-sm"
        >
          <div className={`text-3xl font-extrabold ${card.color}`}>{card.value}</div>
          <div className="text-base text-muted mt-1">{card.label}</div>
        </div>
      ))}
    </div>
  )
}
