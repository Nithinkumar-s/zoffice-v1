import React from 'react'
import mockEntries from '@/data/timesheet-mock.json'

export interface TimesheetEntry {
  id: string
  date: string // YYYY-MM-DD
  project: string
  module: string
  activity: string
  description: string
  start: string // HH:MM
  end: string // HH:MM
  hours: number
  auto: boolean
  wfh?: boolean
}

const today = () => new Date().toISOString().slice(0,10)

function blankEntry(): TimesheetEntry {
  return {
    id: crypto.randomUUID(),
    date: today(),
    project: '',
    module: '',
    activity: '',
    description: '',
    start: '',
    end: '',
    hours: 0,
  auto: true,
  wfh: false
  }
}

export interface TimesheetState {
  entries: TimesheetEntry[]
  selectedIds: Set<string>
  add: () => void
  update: (id: string, patch: Partial<TimesheetEntry>) => void
  toggleSelect: (id: string) => void
  removeSelected: () => void
  remove: (id: string) => void
  totalDay: number
  recompute: (id: string) => void
  duplicateSelected: () => void
  clear: () => void
}

export function useTimesheet(): TimesheetState {
  const [entries, setEntries] = React.useState<TimesheetEntry[]>(() => {
    const d = today()
    // map JSON mock entries into full TimesheetEntry objects
    return (mockEntries as any[]).map(e => ({
      id: crypto.randomUUID(),
      date: e.date || d,
      project: e.project || '',
      module: e.module || '',
      activity: e.activity || '',
      description: e.description || '',
      start: e.start || '',
      end: e.end || '',
      hours: typeof e.hours === 'number' ? e.hours : 0,
      auto: e.auto !== false, // default true
      wfh: !!e.wfh
    }))
  })
  const [selectedIds, setSelected] = React.useState<Set<string>>(new Set())

  const add = () => setEntries(e => [...e, blankEntry()])
  const update = (id: string, patch: Partial<TimesheetEntry>) => setEntries(es => es.map(r => r.id === id ? { ...r, ...patch } : r))
  const toggleSelect = (id: string) => setSelected(sel => {
    const n = new Set(sel);
    n.has(id) ? n.delete(id) : n.add(id)
    return n
  })
  const removeSelected = () => setEntries(es => es.filter(e => !selectedIds.has(e.id)))
  const remove = (id: string) => setEntries(es => es.filter(e => e.id !== id))
  const duplicateSelected = () => setEntries(es => [
    ...es,
    ...es.filter(e => selectedIds.has(e.id)).map(e => ({ ...e, id: crypto.randomUUID() }))
  ])
  const clear = () => { setEntries([blankEntry()]); setSelected(new Set()) }

  const recompute = (id: string) => setEntries(es => es.map(r => {
    if (r.id !== id) return r
    if (!r.auto) return r
    if (!r.start || !r.end) return { ...r, hours: 0 }
    const [sh, sm] = r.start.split(':').map(Number)
    const [eh, em] = r.end.split(':').map(Number)
    let diff = (eh*60+em) - (sh*60+sm)
    if (diff < 0) diff += 24*60 // cross midnight
    const hrs = diff/60
    const rounded = Math.round(hrs*4)/4
    return { ...r, hours: rounded }
  }))

  const totalDay = entries.reduce((s,e) => s + e.hours, 0)

  return { entries, selectedIds, add, update, toggleSelect, removeSelected, remove, totalDay, recompute, duplicateSelected, clear }
}
