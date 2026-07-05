import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { TOPICS, PATTERNS, PLATFORMS, DIFFICULTIES, STATUSES } from '../utils/constants.js'
import { useProblems } from '../context/ProblemContext.jsx'
import { addDays } from '../utils/dateHelpers.js'

function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function createEmptyForm() {
  const solvedDate = getTodayDate()
  return {
    name: '',
    platform: PLATFORMS[0],
    topic: TOPICS[0],
    pattern: PATTERNS[0],
    difficulty: 'Medium',
    status: 'Pending',
    needsRevision: false,
    mistakes: '',
    solvedDate,
    revisionAfterDays: '',
    revisionReminderDate: '',
  }
}

export default function AddProblem({ editingProblem, onClose }) {
  const { addProblem, updateProblem } = useProblems()
  const [form, setForm] = useState(createEmptyForm)

  useEffect(() => {
    if (editingProblem) {
      setForm({
        ...createEmptyForm(),
        ...editingProblem,
        revisionAfterDays: editingProblem.revisionAfterDays ?? '',
      })
    } else {
      setForm(createEmptyForm())
    }
  }, [editingProblem])

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return

    const revisionAfterDays = form.revisionAfterDays === '' ? '' : Number(form.revisionAfterDays)
    const solvedDate = form.solvedDate || getTodayDate()
    const revisionReminderDate = revisionAfterDays === '' ? '' : addDays(solvedDate, revisionAfterDays)
    const payload = {
      ...form,
      needsRevision: revisionReminderDate ? true : form.needsRevision,
      revisionAfterDays,
      solvedDate,
      revisionReminderDate,
      updatedAt: new Date().toISOString(),
    }

    if (editingProblem) {
      updateProblem(payload)
    } else {
      addProblem(payload)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-md w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-xl font-semibold text-text">
            {editingProblem ? 'Edit Problem' : 'Add Problem'}
          </h2>
          <button onClick={onClose} className="text-muted hover:text-text">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <Field label="Problem Name">
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="e.g. Two Sum"
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Platform">
              <select
                value={form.platform}
                onChange={(e) => setField('platform', e.target.value)}
                className="input"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Difficulty">
              <select
                value={form.difficulty}
                onChange={(e) => setField('difficulty', e.target.value)}
                className="input"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Topic">
              <select
                value={form.topic}
                onChange={(e) => setField('topic', e.target.value)}
                className="input"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Pattern">
              <select
                value={form.pattern}
                onChange={(e) => setField('pattern', e.target.value)}
                className="input"
              >
                {PATTERNS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => setField('status', e.target.value)}
                className="input"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Solved Date">
              <input
                type="date"
                value={form.solvedDate}
                onChange={(e) => setField('solvedDate', e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Revise After">
              <select
                value={form.revisionAfterDays}
                onChange={(e) => {
                  const value = e.target.value === '' ? '' : Number(e.target.value)
                  setField('revisionAfterDays', value)
                  setField('needsRevision', value !== '')
                }}
                className="input"
              >
                <option value="">No reminder</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>1 month</option>
              </select>
            </Field>
          </div>

          <label className="flex items-center gap-2 text-base text-text">
            <input
              type="checkbox"
              checked={form.needsRevision}
              onChange={(e) => setField('needsRevision', e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            Mark for revision
          </label>

          <Field label="Mistakes / Notes">
            <textarea
              value={form.mistakes}
              onChange={(e) => setField('mistakes', e.target.value)}
              placeholder="e.g. Off-by-one error in the loop bound"
              rows={3}
              className="input resize-none"
            />
          </Field>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-base font-medium text-muted hover:text-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-base font-medium border border-border bg-background text-text transition-colors hover:border-primary"
            >
              {editingProblem ? 'Save Changes' : 'Add Problem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-base font-medium text-text">{label}</label>
      {children}
    </div>
  )
}
