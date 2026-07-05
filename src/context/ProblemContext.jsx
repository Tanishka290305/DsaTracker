import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { getProblemReminderDate, getTodayDateString, isDateDue } from '../utils/dateHelpers.js'

const ProblemContext = createContext(null)
const STORAGE_KEY = 'dsatrack_problems'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'UPDATE':
      return state.map((p) => (p.id === action.payload.id ? action.payload : p))
    case 'DELETE':
      return state.filter((p) => p.id !== action.payload)
    case 'MARK_REVISED':
      return state.map((p) =>
        p.id === action.payload
          ? {
              ...p,
              needsRevision: false,
              revisionCount: (p.revisionCount || 0) + 1,
              lastRevisedDate: getTodayDateString(),
              revisionReminderDate: '',
            }
          : p
      )
    case 'REPLACE_ALL':
      return action.payload
    default:
      return state
  }
}

export function ProblemProvider({ children }) {
  const [problems, dispatch] = useReducer(reducer, undefined, loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(problems))
  }, [problems])

  useEffect(() => {
    const nextProblems = problems.map((problem) => {
      const reminderDate = getProblemReminderDate(problem)
      if (!reminderDate || problem.needsRevision) return problem
      if (!isDateDue(reminderDate)) return problem

      return {
        ...problem,
        needsRevision: true,
        revisionReminderDate: reminderDate,
        updatedAt: new Date().toISOString(),
      }
    })

    const hasChanges = nextProblems.some((problem, index) => problem !== problems[index])
    if (hasChanges) {
      dispatch({ type: 'REPLACE_ALL', payload: nextProblems })
    }
  }, [problems])

  const addProblem = (data) => {
    dispatch({
      type: 'ADD',
      payload: {
        id: crypto.randomUUID(),
        revisionCount: 0,
        createdAt: new Date().toISOString(),
        ...data,
      },
    })
  }

  const updateProblem = (data) => dispatch({ type: 'UPDATE', payload: data })
  const deleteProblem = (id) => dispatch({ type: 'DELETE', payload: id })
  const markRevised = (id) => dispatch({ type: 'MARK_REVISED', payload: id })
  const replaceAll = (data) => dispatch({ type: 'REPLACE_ALL', payload: data })

  return (
    <ProblemContext.Provider
      value={{
        problems,
        addProblem,
        updateProblem,
        deleteProblem,
        markRevised,
        replaceAll,
      }}
    >
      {children}
    </ProblemContext.Provider>
  )
}

export function useProblems() {
  const ctx = useContext(ProblemContext)
  if (!ctx) throw new Error('useProblems must be used within a ProblemProvider')
  return ctx
}
