import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface DatePickerProps { value: string; onChange: (v: string) => void; className?: string }

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, className }) => {
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  const date = value ? new Date(value) : undefined

  // Close on outside click or Escape
  React.useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => { document.removeEventListener('mousedown', handleClick); document.removeEventListener('keydown', handleKey) }
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(o=>!o)}
  onBlur={() => {
          // If focus moves outside the root, close
          requestAnimationFrame(() => {
            if (rootRef.current && !rootRef.current.contains(document.activeElement)) {
              setOpen(false)
            }
          })
        }}
        className="h-10 w-full rounded-md border border-[hsl(var(--border))] bg-white px-3 text-sm flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>{date ? format(date,'dd MMM yyyy') : 'Pick date'}</span>
        <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H9V3a1 1 0 10-2 0v1H6V3a1 1 0 00-1-1z" /><path d="M18 9H2v7a2 2 0 002 2h12a2 2 0 002-2V9z" /></svg>
      </button>
      {open && (
        <div className="absolute z-40 mt-2 rounded-md border border-[hsl(var(--border))] bg-white p-2 shadow-md" role="dialog" aria-label="Choose date">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(d: Date | undefined) => { if (d) onChange(d.toISOString().slice(0,10)); setOpen(false) }}
            weekStartsOn={1}
          />
        </div>
      )}
    </div>
  )
}
