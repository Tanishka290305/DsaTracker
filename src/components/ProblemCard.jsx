import React from 'react'
import { CheckCircle } from 'lucide-react'
import { useProblems } from '../context/ProblemContext.jsx'
import { STATUSES } from '../utils/constants.js'
import { getProblemReminderDate, isDateDue } from '../utils/dateHelpers.js'

const difficultyStyles = {
  Easy: 'bg-primary/10 text-primary',
  Medium: 'bg-warning/20 text-warning',
  Hard: 'bg-danger/10 text-danger',
}

const statusStyles = {
  Solved: 'bg-accent/10 text-accent',
  Pending: 'bg-warning/10 text-warning',
}

export default function ProblemCard({ problem, onEdit }) {
  const { deleteProblem, markRevised, updateProblem } = useProblems()
  const reminderDate = getProblemReminderDate(problem)
  const reminderDue = isDateDue(reminderDate)

  const handleDelete = () => {
    if (confirm(`Delete "${problem.name}"? This can't be undone.`)) {
      deleteProblem(problem.id)
    }
  }

  const handleStatusChange = (e) => {
    updateProblem({
      ...problem,
      status: e.target.value,
      updatedAt: new Date().toISOString(),
    })
  }

  const handleMarkForRevision = () => {
    updateProblem({
      ...problem,
      needsRevision: true,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="bg-card/90 border border-border rounded-xl px-5 py-4 flex flex-col gap-2 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-text">{problem.name}</h3>
          <div className="text-base text-muted mt-0.5">{problem.platform}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {problem.needsRevision ? (
            <button
              onClick={() => markRevised(problem.id)}
              title="Revision done"
              className="flex items-center gap-1.5 rounded-md border border-accent/20 bg-accent/10 px-3 py-2 text-sm font-medium text-accent transition-colors hover:border-accent"
            >
              <CheckCircle size={16} className="text-accent" />
              Revision Done
            </button>
          ) : (
            <button
              onClick={handleMarkForRevision}
              className="rounded-md border border-warning/20 bg-warning/10 px-3 py-2 text-sm font-medium text-warning transition-colors hover:border-warning"
            >
              Mark Revision
            </button>
          )}

          <select
            value={problem.status}
            onChange={handleStatusChange}
            className="h-9 rounded-md border border-border bg-background px-2 text-sm text-text transition-colors hover:border-primary focus:outline-none"
            aria-label="Change problem status"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button
            onClick={() => onEdit(problem)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-text transition-colors hover:border-primary"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-danger transition-colors hover:border-danger"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-1">
        <span className={`px-2.5 py-1 rounded-md text-sm font-medium ${difficultyStyles[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
        <span className={`px-2.5 py-1 rounded-l text-sm font-medium ${statusStyles[problem.status]}`}>
          {problem.status}
        </span>
        {problem.topic && (
          <span className="px-2.5 py-1 rounded-l text-sm font-medium bg-background text-muted border border-border">
            {problem.topic}
          </span>
        )}
        {problem.pattern && (
          <span className="px-2.5 py-1 rounded-l text-sm font-medium bg-background text-muted border border-border">
            {problem.pattern}
          </span>
        )}
        {reminderDate && (
          <span
            className={`px-2.5 py-1 rounded-l text-sm font-medium ${
              reminderDue ? 'bg-danger/10 text-danger' : 'bg-accent/10 text-accent'
            }`}
          >
            {reminderDue ? 'Revision Due' : `Revise on ${reminderDate}`}
          </span>
        )}
        {!reminderDate && problem.needsRevision && (
          <span className="px-2.5 py-1 rounded-l text-sm font-medium bg-danger/10 text-danger">
            Needs Revision
          </span>
        )}
      </div>

      {problem.mistakes && (
        <p className="text-base text-muted mt-1">
          <span className="font-medium text-text">Notes: </span>
          {problem.mistakes}
        </p>
      )}

      <div className="flex items-center gap-4 text-sm text-muted mt-1">
        {problem.solvedDate && <span>Solved: {problem.solvedDate}</span>}
        <span>Revised {problem.revisionCount || 0}x</span>
      </div>
    </div>
  )
}
