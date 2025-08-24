import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FileText } from 'lucide-react'
import type { TimesheetEntry } from './useTimesheet'
import { Button } from '@/components/ui/button'
import { TimePicker } from '@/components/ui/time-picker'
import { Select } from '@/components/ui/select'

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSubmit: (data: Partial<TimesheetEntry>) => void
  initial?: TimesheetEntry | null
}

const ActivityDialog: React.FC<Props> = ({ open, onOpenChange, onSubmit, initial }) => {
  const [draft, setDraft] = React.useState<Partial<TimesheetEntry>>({})
  React.useEffect(()=>{ if(open) setDraft(initial || { date: new Date().toISOString().slice(0,10) }) },[open, initial])
  const patch = (p: Partial<TimesheetEntry>) => setDraft(d => ({ ...d, ...p }))
  // derived hours calculation
  const computeHours = React.useCallback((start?: string, end?: string) => {
    if (!start || !end) return 0
    const [sh, sm] = start.split(':').map(Number)
    const [eh, em] = end.split(':').map(Number)
    if ([sh, sm, eh, em].some(n => Number.isNaN(n))) return 0
    let diff = (eh * 60 + em) - (sh * 60 + sm)
    if (diff <= 0) return 0 // simple validation (no cross midnight for now)
    const roundedMinutes = Math.round(diff / 15) * 15
    return +(roundedMinutes / 60).toFixed(2)
  }, [])

  const hours = computeHours(draft.start, draft.end)

  const isTimeInvalid = !!draft.start && !!draft.end && hours === 0
  // Required fields exclude module, description, and wfh per new requirement
  const requiredMissing = !draft.project || !draft.activity || !draft.start || !draft.end
  const disableSubmit = requiredMissing || isTimeInvalid

  const submit = () => {
    if (disableSubmit) return
    onSubmit({ ...draft, hours, auto: true })
    onOpenChange(false)
  }

  const projectOptions = [
    { label: 'zoffice', value: 'zoffice' },
    { label: 'internal', value: 'internal' },
    { label: 'website', value: 'website' }
  ]
  const moduleOptions = [
    { label: 'UI', value: 'UI' },
    { label: 'Auth', value: 'Auth' },
    { label: 'API', value: 'API' },
    { label: 'Timesheet', value: 'Timesheet' }
  ]
  const activityOptions = [
    { label: 'coding', value: 'coding' },
    { label: 'review', value: 'review' },
    { label: 'testing', value: 'testing' },
    { label: 'writing', value: 'writing' }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 bg-white max-w-xl rounded-2xl shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] border border-black/10">
        <div className="px-10 pt-9 pb-4">
          <DialogHeader className="flex flex-row items-start gap-3 p-0 mb-2">
            <div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))/0.1] flex items-center justify-center text-[hsl(var(--primary))]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold tracking-tight leading-none">
                {initial ? 'Edit Activity' : 'New Activity'}
              </DialogTitle>
            </div>
          </DialogHeader>
          <form onSubmit={e=>{e.preventDefault(); submit();}} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">
            <div className="space-y-1.5">
              <label className='text-sm font-medium'>Project</label>
              <Select value={draft.project||''} onChange={v=>patch({ project: v })} options={projectOptions} />
            </div>
            <div className="space-y-1.5">
              <label className='text-sm font-medium'>Module</label>
              <Select value={draft.module||''} onChange={v=>patch({ module: v })} options={moduleOptions} />
            </div>
            <div className="space-y-1.5">
              <label className='text-sm font-medium'>Activity</label>
              <Select value={draft.activity||''} onChange={v=>patch({ activity: v })} options={activityOptions} />
            </div>
            <div className="space-y-1.5">
              <label className='text-sm font-medium flex items-center gap-1'>Time Range {isTimeInvalid && <span className='text-destructive text-xs font-normal'>(invalid)</span>}</label>
              <div className="grid grid-cols-2 gap-4">
                <TimePicker value={draft.start} onChange={v=>patch({ start: v })} />
                <TimePicker value={draft.end} onChange={v=>patch({ end: v })} />
              </div>
              {isTimeInvalid && <p className='text-xs text-destructive mt-1'>End must be after start.</p>}
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className='text-sm font-medium'>Description</label>
              <textarea
                className='w-full rounded-md border border-[hsl(var(--border))] bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px] resize-y'
                value={draft.description||''}
                onChange={e=>patch({ description: e.target.value })}
                placeholder='Description'
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
              <span id='wfh-label' className='text-sm font-medium text-right'>Work From Home</span>
              <button
                id='wfh-switch'
                type='button'
                onClick={()=>patch({ wfh: !draft.wfh })}
                role='switch'
                aria-labelledby='wfh-label'
                aria-checked={!!draft.wfh}
                className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border ' + (draft.wfh
                  ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))]'
                  : 'bg-muted border-[hsl(var(--border))]')}
              >
                <span
                  className={'inline-block h-5 w-5 rounded-full bg-white shadow ring-1 ring-black/5 transform transition-transform ' + (draft.wfh ? 'translate-x-5' : 'translate-x-1')}
                />
              </button>
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 pt-4">
              <Button type='button' variant='outline' onClick={()=>onOpenChange(false)}>Cancel</Button>
              <Button type='submit' disabled={disableSubmit}>{initial ? 'Update Activity' : 'Add Activity'}</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ActivityDialog
