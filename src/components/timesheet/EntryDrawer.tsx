import React from 'react'
import type { TimesheetEntry } from './useTimesheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  open: boolean
  onClose: () => void
  entry: TimesheetEntry | null
  onSave: (value: Partial<TimesheetEntry>) => void
  mode: 'add' | 'edit'
}

const Overlay: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClick} />
)

const EntryDrawer: React.FC<Props> = ({ open, onClose, entry, onSave, mode }) => {
  const [draft, setDraft] = React.useState<Partial<TimesheetEntry>>({})
  React.useEffect(() => {
    if (open) setDraft(entry || {})
  }, [open, entry])

  const update = (patch: Partial<TimesheetEntry>) => setDraft(d => ({ ...d, ...patch }))
  const save = () => { onSave(draft); onClose() }

  if (!open) return null

  return (
    <>
      <Overlay onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col animate-in slide-in-from-right">
        <div className="px-6 py-4 border-b flex items-center gap-4">
          <h2 className="text-base font-semibold tracking-tight">{mode === 'add' ? 'Add Entry' : 'Edit Entry'}</h2>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline" onClick={onClose}>Cancel</Button>
            <Button size="sm" onClick={save} className="bg-[hsl(var(--primary))] text-white">Save</Button>
          </div>
        </div>
        <div className="px-6 py-6 overflow-y-auto space-y-5 text-sm">
          <div className="space-y-1">
            <label className="font-medium">Date</label>
            <Input type="date" value={draft.date || ''} onChange={e => update({ date: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium">Start</label>
              <Input type="time" value={draft.start || ''} onChange={e => update({ start: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="font-medium">End</label>
              <Input type="time" value={draft.end || ''} onChange={e => update({ end: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="font-medium">Project</label>
            <Input value={draft.project || ''} onChange={e => update({ project: e.target.value })} placeholder="Project name" />
          </div>
          <div className="space-y-1">
            <label className="font-medium">Module</label>
            <Input value={draft.module || ''} onChange={e => update({ module: e.target.value })} placeholder="Module / Component" />
          </div>
            <div className="space-y-1">
            <label className="font-medium">Activity</label>
            <Input value={draft.activity || ''} onChange={e => update({ activity: e.target.value })} placeholder="Activity" />
          </div>
          <div className="space-y-1">
            <label className="font-medium">Description</label>
            <Input value={draft.description || ''} onChange={e => update({ description: e.target.value })} placeholder="What did you do?" />
          </div>
        </div>
      </div>
    </>
  )
}

export default EntryDrawer
