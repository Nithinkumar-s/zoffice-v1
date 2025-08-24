import React from 'react'
import { Select } from '@/components/ui/select'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

interface LeaveCardRow {
  name: string
  cl: number
  sl: number
  lwp: number
  vac: number
  ml: number
  coff: number
}

const LeaveCardPage: React.FC = () => {
  // Mock single row (could be expanded later)
  const row: LeaveCardRow = { name: 'Nithinkumar S', cl: 4, sl: 7, lwp: 0, vac: 7, ml: 0, coff: 0 }
  const total = row.cl + row.sl // for CL+SL column
  const balanceCLSL = 5 // sample balance value (placeholder logic)

  return (
    <main className='mx-auto w-full max-w-7xl px-6 md:px-10 pb-4 flex flex-col h-full overflow-visible'>
      <div className='flex items-start justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <Select value='2025' onChange={()=>{}} options={[{label:'2025', value:'2025'}]} className='w-[120px]' /> 
        </div>
      </div>
      <div className='overflow-auto rounded-md border bg-white'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[220px]'>Name</TableHead>
              <TableHead className='text-center'>CL</TableHead>
              <TableHead className='text-center'>SL</TableHead>
              <TableHead className='text-center'>CL+SL</TableHead>
              <TableHead className='text-center'>LWP</TableHead>
              <TableHead className='text-center'>VAC</TableHead>
              <TableHead className='text-center'>ML</TableHead>
              <TableHead className='text-center'>Total</TableHead>
              <TableHead className='text-center'>CL SL Balance</TableHead>
              <TableHead className='text-center'>VAC Balance</TableHead>
              <TableHead className='text-center'>Coff Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>{row.name}</TableCell>
              <TableCell className='text-center'>{row.cl}</TableCell>
              <TableCell className='text-center'>{row.sl}</TableCell>
              <TableCell className='text-center'>{total}</TableCell>
              <TableCell className='text-center'>{row.lwp}</TableCell>
              <TableCell className='text-center'>{row.vac}</TableCell>
              <TableCell className='text-center'>{row.ml}</TableCell>
              <TableCell className='text-center'>{total}</TableCell>
              <TableCell className='text-center'>{balanceCLSL}</TableCell>
              <TableCell className='text-center'>{row.vac}</TableCell>
              <TableCell className='text-center'>{row.coff}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

export default LeaveCardPage
