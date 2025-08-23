import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
  <DialogContent className="p-0 bg-white max-w-2xl rounded-xl shadow-lg border border-border/60">
                <DialogHeader className="px-8 pt-8 pb-4">
                    <DialogTitle>{initial ? 'Edit Activity' : 'New Activity'}</DialogTitle>
                </DialogHeader>
                <div className="px-8 pt-1 pb-8 bg-white">
          <form onSubmit={e=>{e.preventDefault(); submit();}} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {/* Row 1 */}
            <div className="space-y-1">
              <label className='text-sm font-medium'>Project</label>
              <Select value={draft.project||''} onChange={v=>patch({ project: v })} options={projectOptions} />
            </div>
            <div className="space-y-1">
              <label className='text-sm font-medium'>Module <span className='text-xs text-muted-foreground'>(optional)</span></label>
              <Select value={draft.module||''} onChange={v=>patch({ module: v })} options={moduleOptions} />
            </div>
            {/* Row 2 */}
            <div className="space-y-1">
              <label className='text-sm font-medium'>Activity</label>
              <Select value={draft.activity||''} onChange={v=>patch({ activity: v })} options={activityOptions} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className='text-sm font-medium'>Start Time</label>
                <TimePicker value={draft.start} onChange={v=>patch({ start: v })} />
              </div>
              <div className="space-y-1">
                <label className='text-sm font-medium'>End Time</label>
                <TimePicker value={draft.end} onChange={v=>patch({ end: v })} />
                {isTimeInvalid && <p className='text-xs text-destructive mt-1'>End must be after Start.</p>}
              </div>
            </div>
            {/* Description + WFH Row */}
            <div className="md:col-span-2 grid md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-1">
                <label className='text-sm font-medium'>Description <span className='text-xs text-muted-foreground'>(optional)</span></label>
                <textarea
                  className='w-full rounded-md border border-[hsl(var(--border))] bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[110px] resize-y'
                  value={draft.description||''}
                  onChange={e=>patch({ description: e.target.value })}
                  placeholder='Description'
                />
              </div>
              <div className="space-y-1">
                <label className='text-sm font-medium' htmlFor='wfh-box'>Work From Home <span className='text-xs text-muted-foreground'>(optional)</span></label>
                <div className='h-10 flex items-center rounded-md   px-4 bg-background gap-2'>
                  <input
                    id='wfh-box'
                    type='checkbox'
                    className='h-4 w-4 accent-[hsl(var(--primary))]'
                    checked={!!draft.wfh}
                    onChange={e=>patch({ wfh: e.target.checked })}
                  /> 
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="md:col-span-2 flex justify-end items-end pt-2">
              <div className='flex gap-2'>
                <Button type='button' variant='outline' onClick={()=>onOpenChange(false)}>Cancel</Button>
                <Button type='submit' disabled={disableSubmit}>{initial ? 'Update' : 'Add'}</Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ActivityDialog
