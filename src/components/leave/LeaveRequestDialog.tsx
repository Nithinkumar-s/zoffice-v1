import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'

export interface LeaveRequestDraft {
  id?: string
  employee: string
  leaveType: string
  startDate: string
  endDate: string
  reason: string
  days: number
  status?: string
}

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  initial?: LeaveRequestDraft | null
  onSubmit: (data: LeaveRequestDraft) => void
}

const leaveTypeOptions = [
  { label: 'Casual Leave', value: 'Casual Leave' },
  { label: 'Sick Leave', value: 'Sick Leave' },
  { label: 'Half Day CL', value: 'Half Day CL' },
  { label: 'Compensatory Off', value: 'Compensatory Off' },
  { label: 'Restricted Holiday', value: 'Restricted Holiday' }
]

function computeDays(leaveType: string, start?: string, end?: string) {
  if (!start || !end) return 0
  if (leaveType.includes('Half Day')) return 0.5
  const s = new Date(start)
  const e = new Date(end)
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return 0
  if (e < s) return 0
  const diff = e.getTime() - s.getTime()
  const days = Math.floor(diff / 86400000) + 1
  return days
}

const LeaveRequestDialog: React.FC<Props> = ({ open, onOpenChange, initial, onSubmit }) => {
  const [draft, setDraft] = React.useState<LeaveRequestDraft>(() => ({
    employee: 'me',
    leaveType: '',
    startDate: new Date().toISOString().slice(0,10),
    endDate: new Date().toISOString().slice(0,10),
    reason: '',
    days: 0,
    status: 'Pending'
  }))

  React.useEffect(() => {
    if (open) {
      setDraft(initial ? { ...initial } : {
        employee: 'me',
        leaveType: '',
        startDate: new Date().toISOString().slice(0,10),
        endDate: new Date().toISOString().slice(0,10),
        reason: '',
        days: 0,
        status: 'Pending'
      })
    }
  }, [open, initial])

  const patch = (p: Partial<LeaveRequestDraft>) => setDraft(d => ({ ...d, ...p }))

  const days = computeDays(draft.leaveType, draft.startDate, draft.endDate)
  const invalidRange = !!draft.startDate && !!draft.endDate && days === 0 && draft.startDate !== draft.endDate
  const missingRequired = !draft.leaveType || !draft.startDate || !draft.endDate
  const disableSubmit = missingRequired || invalidRange

  const submit = () => {
    if (disableSubmit) return
    onSubmit({ ...draft, days })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='p-0 bg-white max-w-2xl rounded-2xl shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] border border-black/10'>
        <div className='px-8 pt-6 pb-4'>
          <DialogHeader className='mb-4 p-0'>
            <DialogTitle className='text-xl font-semibold'>{initial ? 'Edit Leave Request' : 'New Leave Request'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={e=>{e.preventDefault(); submit();}} className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-2'>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium'>Employee Name:</label>
              <div className='h-10 w-full rounded-md border border-[hsl(var(--border))] bg-muted px-3 text-sm flex items-center'>Nithinkumar S (Me)</div>
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium'>Leave Type:</label>
              <Select value={draft.leaveType} onChange={v=>patch({ leaveType: v })} options={[{label:'--Select--', value:''}, ...leaveTypeOptions]} />
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium flex items-center gap-2'>Start Date:</label>
              <DatePicker value={draft.startDate} onChange={v=>patch({ startDate: v })} />
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium flex items-center gap-2'>End Date:</label>
              <DatePicker value={draft.endDate} onChange={v=>patch({ endDate: v })} />
            </div>
            <div className='md:col-span-2 space-y-1.5'>
              <label className='text-sm font-medium'>Reason:</label>
              <textarea
                className='w-full rounded-md border border-[hsl(var(--border))] bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[90px] resize-y'
                value={draft.reason}
                onChange={e=>patch({ reason: e.target.value })}
                placeholder='Reason'
              />
            </div>
            <div className='md:col-span-2 flex justify-end pt-2 gap-2'>
              <Button type='button' variant='outline' onClick={()=>onOpenChange(false)}>Cancel</Button>
              <Button type='submit' disabled={disableSubmit}>{initial ? 'Update' : 'Add'}</Button>
            </div>
            {invalidRange && <p className='md:col-span-2 text-xs text-destructive -mt-4'>End date must be after start date.</p>}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LeaveRequestDialog
