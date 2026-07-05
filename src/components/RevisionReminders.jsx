import React, { useMemo } from 'react'
import { BellRing } from 'lucide-react'
import { useProblems } from '../context/ProblemContext.jsx'
import { getProblemReminderDate, isDateDue } from '../utils/dateHelpers.js'

export default function RevisionReminders() {
  const { problems } = useProblems()

  const dueProblems = useMemo(() => {
    return problems.filter((problem) => {
      const reminderDate = getProblemReminderDate(problem)
      return reminderDate && isDateDue(reminderDate)
    })
  }, [problems])

  if (dueProblems.length === 0) return null

  return (
    <div className="mx-6 mt-5 rounded-xl border border-danger/20 bg-danger/10 px-5 py-4">
      <div className="flex items-center gap-2 text-danger font-semibold">
        <BellRing size={18} />
        Revision reminder
      </div>
      <p className="text-sm text-text mt-1">
        You have {dueProblems.length} problem{dueProblems.length > 1 ? 's' : ''} ready to revise today.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {dueProblems.slice(0, 5).map((problem) => (
          <span
            key={problem.id}
            className="rounded-md border border-danger/20 bg-card px-3 py-1.5 text-sm text-text"
          >
            {problem.name}
          </span>
        ))}
        {dueProblems.length > 5 ? (
          <span className="rounded-md border border-danger/20 bg-card px-3 py-1.5 text-sm text-muted">
            +{dueProblems.length - 5} more
          </span>
        ) : null}
      </div>
    </div>
  )
}