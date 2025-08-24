import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import leaveData from '@/data/leave-requests.json'
import { DataTable } from '@/components/ui/data-table'
import type { ColumnDef, Row } from '@tanstack/react-table'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Edit2, Trash2 } from 'lucide-react'
import LeaveRequestDialog, { type LeaveRequestDraft } from '@/components/leave/LeaveRequestDialog'
import { Badge } from '@/components/ui/badge'

interface LeaveRequest {
  id: string
  employee: string
  leaveType: string
  startDate: string
  endDate: string
  days: number
  reason: string
  status: string
}

const formatDate = (iso: string) => {
  if (!iso) return '-' ;
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' }) + (iso.includes('T') ? ' ' + d.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'}) : '')
}

const LeaveRequestPage: React.FC = () => {
  const [rows, setRows] = React.useState<LeaveRequest[]>(() => (leaveData as LeaveRequest[]).map(r => ({ ...r, id: crypto.randomUUID() })))
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)

  const totalKeyLeaves = rows.filter(r => ['Casual Leave','Sick Leave','Sick Leave Half','Half Day CL','Restricted Holiday'].includes(r.leaveType)).reduce((s,r)=> s + r.days,0)

  const remove = (id: string) => {
    setRows(r => r.filter(x => x.id !== id))
    toast.success('Leave request deleted')
  }

  const openAdd = () => { setEditingId(null); setDialogOpen(true) }
  const openEdit = (id: string) => { setEditingId(id); setDialogOpen(true) }

  const columns: ColumnDef<LeaveRequest, any>[] = [
    { id: 'type', header: 'Leave Type', cell: ({ row }) => <span className='px-1 inline-block min-w-[110px]'>{row.original.leaveType}</span> },
    { id: 'start', header: 'Start Date', cell: ({ row }) => <span>{formatDate(row.original.startDate)}</span> },
    { id: 'end', header: 'End Date', cell: ({ row }) => <span>{formatDate(row.original.endDate)}</span> },
    { id: 'days', header: 'No. of Days', cell: ({ row }) => <span>{row.original.days}</span> },
    { id: 'reason', header: 'Reason', cell: ({ row }) => <span className='max-w-[220px] inline-block truncate' title={row.original.reason}>{row.original.reason}</span> },
    { id: 'status', header: 'Status', cell: ({ row }) => {
      const s = row.original.status || 'Pending'
      const color = s === 'Approved' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : s === 'Rejected' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-amber-100 text-amber-700 border-amber-300'
      return <Badge className={color + ' capitalize'} variant='outline'>{s}</Badge>
    } },
    { id: 'actions', header: 'Actions', cell: ({ row }: { row: Row<LeaveRequest> }) => (
      <div className='flex gap-2'>
        <Button
          variant='outline'
          size='sm'
          className='h-8 w-8 p-0'
          title='Edit'
          onClick={() => openEdit(row.original.id)}
        >
          <Edit2 className='h-4 w-4' />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline' size='sm' className='h-8 w-8 p-0 text-red-600' title='Delete'>
              <Trash2 className='h-4 w-4' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Leave Request</AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to remove this leave entry?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => remove(row.original.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )}
  ]

  return (
    <main className='mx-auto w-full max-w-7xl px-6 md:px-10 pb-4 flex flex-col h-full overflow-hidden'>
      <div className='flex-none space-y-6 pb-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-end'>
          <div>
            <label className='block text-sm font-medium mb-2'>Employee:</label>
            <Select value='me' onChange={()=>{}} options={[{label:'Nithinkumar S (Me)', value:'me'}]} />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Year:</label>
            <Select value='2025' onChange={()=>{}} options={[{label:'2025', value:'2025'},{label:'2024', value:'2024'}]} />
          </div>
          <div className='flex md:justify-end gap-3'>
            <Button className='mt-6' onClick={openAdd}>Request Leave</Button>
          </div>
        </div>
      </div>
      <div className='flex-1 min-h-0 overflow-auto pr-1'>
        <Card className='shadow-sm'>
          <CardContent className='pt-6'>
            <DataTable<LeaveRequest, unknown> data={rows} columns={columns} />
            <div className='flex justify-end pt-6'>
              <div className='text-sm font-semibold bg-white px-4 py-2 rounded-md shadow border'>
                Total (CL + SL + SHL) : <span className='text-red-600'>{totalKeyLeaves}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <LeaveRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editingId ? rows.find(r => r.id === editingId) || null : null}
        onSubmit={(val: LeaveRequestDraft) => {
          if (!editingId) {
            setRows(r => [...r, { ...val, id: crypto.randomUUID(), status: 'Pending' }])
            toast.success('Leave request added')
          } else {
            setRows(r => r.map(x => x.id === editingId ? { ...x, ...val } : x))
            toast.success('Leave request updated')
          }
        }}
      />
    </main>
  )
}

export default LeaveRequestPage
