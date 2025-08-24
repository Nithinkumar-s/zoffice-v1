import * as React from 'react'
import { cn } from '@/lib/utils'

interface TimePickerProps {
  value: string | undefined
  onChange: (val: string) => void
  stepMinutes?: number // default 15
  className?: string
  placeholder?: string
  disabled?: boolean
  twelveHour?: boolean // display in 12h with AM/PM
}

function buildTimes(step: number) {
  const out: string[] = []
  for (let m = 0; m < 24 * 60; m += step) {
    const h = Math.floor(m / 60)
    const mm = m % 60
    out.push(`${String(h).padStart(2,'0')}:${String(mm).padStart(2,'0')}`)
  }
  return out
}

function format12(hhmm: string) {
  const [hStr, mStr] = hhmm.split(':')
  let h = parseInt(hStr,10)
  if (Number.isNaN(h)) return hhmm
  const suffix = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  return `${String(h).padStart(2,'0')}:${mStr} ${suffix}`
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, stepMinutes = 15, className, placeholder='--:--', disabled, twelveHour = true }) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement | null>(null)
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  const times = React.useMemo(() => buildTimes(stepMinutes), [stepMinutes])

  React.useEffect(()=>{
    if(!open) return
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('mousedown', handleClick)
    window.addEventListener('keydown', handleKey)
    return () => { window.removeEventListener('mousedown', handleClick); window.removeEventListener('keydown', handleKey) }
  },[open])

  const currentIndex = value ? times.indexOf(value) : -1

  const move = (delta: number) => {
    let idx = currentIndex
    if (idx === -1) idx = 0
    else idx = (idx + delta + times.length) % times.length
    onChange(times[idx])
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      setOpen(true); e.preventDefault(); return
    }
    if (open) {
      if (e.key === 'ArrowDown') { move(1); e.preventDefault() }
      else if (e.key === 'ArrowUp') { move(-1); e.preventDefault() }
      else if (e.key === 'Enter') { setOpen(false); e.preventDefault() }
    }
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        ref={btnRef}
        type='button'
        disabled={disabled}
        aria-haspopup='listbox'
        aria-expanded={open}
        onClick={()=> setOpen(o=>!o)}
        onKeyDown={onKeyDown}
        className={cn('h-10 w-full rounded-md border border-[hsl(var(--border))] bg-white px-3 text-sm flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50')}>
  <span className='tabular-nums'>{value ? (twelveHour ? format12(value) : value) : placeholder}</span>
        <svg className='h-4 w-4 text-muted-foreground' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <circle cx='12' cy='12' r='9' />
          <path d='M12 7v5l3 3' />
        </svg>
      </button>
      {open && (
        <div className='absolute z-50 mt-1 w-full rounded-md border border-[hsl(var(--border))] bg-white shadow-md max-h-64 overflow-auto py-1 text-sm'>
          <ul role='listbox' aria-activedescendant={value} className='divide-y divide-border/40'>
    {times.map(t => (
              <li key={t} role='option' aria-selected={t===value}>
                <button
                  type='button'
                  onClick={() => { onChange(t); setOpen(false); btnRef.current?.focus() }}
      className={cn('w-full text-left px-3 py-1.5 hover:bg-[hsl(var(--primary))/8] focus:bg-[hsl(var(--primary))/12] focus:outline-none tabular-nums', t===value && 'bg-[hsl(var(--primary))/15] font-medium')}>{twelveHour ? format12(t) : t}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TimePicker
