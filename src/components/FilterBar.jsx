import React from 'react'
import { Search, Plus } from 'lucide-react'
import { TOPICS, PATTERNS } from '../utils/constants.js'

const TABS = ['All', 'Solved', 'Pending', 'Revision']

export default function FilterBar({ filters, setFilters, onAddClick }) {
  const { tab, topic, pattern, search } = filters

  const setField = (field, value) => setFilters((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="px-6 pt-5 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-card border border-border rounded-lg p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setField('tab', t)}
              className={`px-4 py-1.5 rounded-md text-base font-medium transition-colors ${
                tab === t ? 'bg-primary text-white' : 'text-muted hover:text-text'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <select
          value={topic}
          onChange={(e) => setField('topic', e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-base text-text"
        >
          <option value="">All Topics</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={pattern}
          onChange={(e) => setField('pattern', e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-base text-text"
        >
          <option value="">All Patterns</option>
          {PATTERNS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setField('search', e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-10 pr-3 py-2 text-base text-text placeholder:text-muted"
          />
        </div>

        <button
          onClick={onAddClick}
          className="ml-auto flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-base font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add Problem
        </button>
      </div>
    </div>
  )
}
