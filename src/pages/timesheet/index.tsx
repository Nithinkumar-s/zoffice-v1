import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import ActivityDialog from '@/components/timesheet/ActivityDialog'
import { useTimesheet } from '@/components/timesheet/useTimesheet'
import { Select } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { DataTable } from '@/components/ui/data-table'
import type { Row } from '@tanstack/react-table'
import type { TimesheetEntry } from '@/components/timesheet/useTimesheet'

const TimesheetPage: React.FC = () => {
	const { entries, add, update, totalDay, remove } = useTimesheet()
	const [dialogOpen, setDialogOpen] = React.useState(false)
	const [editingId, setEditingId] = React.useState<string | null>(null)
	// row editing disabled; using drawer modal instead
	const openAdd = () => { setEditingId(null); setDialogOpen(true) }
	const format = (h: number) => {
		const hrs = Math.floor(h)
		const mins = Math.round((h - hrs)*60)
		return `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}`
	}

	return (
		<main className="mx-auto w-full max-w-7xl px-6 md:px-10 pb-4 flex flex-col h-full overflow-hidden">
			{/* Filters & summary (fixed height) */}
			<div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-6 flex-none">
				<div className="xl:col-span-7 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
						<div>
							<label className="block text-sm font-medium mb-2">Employee:</label>
							<Select value="me" onChange={() => {}} options={[{ label: 'Nithinkumar s', value: 'me' }]} />
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Date:</label>
							<DatePicker value={entries[0]?.date || ''} onChange={v => update(entries[0].id, { date: v })} />
						</div>
						<div className="flex md:justify-end">
							<Button onClick={openAdd} className="mt-6"><Plus className="h-4 w-4 mr-1" />Add</Button>
						</div>
					</div>
				</div>
				<div className="xl:col-span-5 flex flex-col md:flex-row gap-6">
					<Card className="flex-1">
						<CardContent className="p-6 flex flex-col justify-between h-full">
							<div className="text-sm font-medium mb-4">Time Effort</div>
							<div className="text-2xl font-semibold text-emerald-500">{format(totalDay)}</div>
						</CardContent>
					</Card>
					<Card className="flex-1">
						<CardContent className="p-6 flex flex-col justify-between h-full">
							<div className="text-sm font-medium mb-4">Weekly Effort</div>
							<div className="text-2xl font-semibold text-emerald-500">40:00</div>
						</CardContent>
					</Card>
				</div>
			</div>
			{/* Scrollable table area */}
			<div className="flex-1 min-h-0 overflow-auto pr-1">
			<Card className="shadow-sm">
				<CardContent className="pt-6 space-y-6">
						<DataTable<TimesheetEntry, unknown>
							data={entries}
							rowClassName={() => ''}
							columns={[
								{ id: 'project', header: 'Project', cell: ({ row }: { row: Row<TimesheetEntry> }) => <span className="px-1 inline-block min-w-[80px]">{row.original.project||'-'}</span> },
								{ id: 'module', header: 'Module', cell: ({ row }: { row: Row<TimesheetEntry> }) => <span className="px-1 inline-block min-w-[60px]">{row.original.module||'-'}</span> },
								{ id: 'activity', header: 'Activity', cell: ({ row }: { row: Row<TimesheetEntry> }) => <span className="px-1 inline-block min-w-[70px]">{row.original.activity||'-'}</span> },
								{ id: 'start', header: 'Start Time', cell: ({ row }: { row: Row<TimesheetEntry> }) => <span className="px-1 inline-block">{row.original.start || '--:--'}</span> },
								{ id: 'end', header: 'End Time', cell: ({ row }: { row: Row<TimesheetEntry> }) => <span className="px-1 inline-block">{row.original.end || '--:--'}</span> },
								{ id: 'effort', header: 'Total Effort', cell: ({ row }: { row: Row<TimesheetEntry> }) => <span className="px-1 inline-block">{row.original.hours.toFixed(2)}</span> },
								{ id: 'desc', header: 'Description', cell: ({ row }: { row: Row<TimesheetEntry> }) => <span className="px-1 inline-block">{row.original.description||'-'}</span> },
								{ id: 'actions', header: 'Actions', cell: ({ row }: { row: Row<TimesheetEntry> }) => (
									<div className="flex items-center gap-2">
										<Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Edit" onClick={() => { setEditingId(row.original.id); setDialogOpen(true); }}><Edit2 className="h-4 w-4" /></Button>
										<Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600" title="Delete" onClick={() => remove(row.original.id)}><Trash2 className="h-4 w-4" /></Button>
									</div>
								)}
							]}
						/>
				</CardContent>
			</Card>
			</div>
			<ActivityDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				initial={editingId ? entries.find(e => e.id === editingId) || null : null}
				onSubmit={(val) => {
					if (!editingId) {
						add();
						const id = entries[entries.length-1]?.id
						if (id) update(id, val)
					} else {
						update(editingId, val)
					}
				}}
			/>
		</main>
	)
}

export default TimesheetPage
