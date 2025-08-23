import * as React from 'react'
import { cn } from '@/lib/utils'

interface Option { label: string; value: string }
interface SelectProps { value: string; onChange: (v: string) => void; options: Option[]; className?: string }

export const Select: React.FC<SelectProps> = ({ value, onChange, options, className }) => {
  const [open, setOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const btnRef = React.useRef<HTMLButtonElement | null>(null)

  // Close on outside click & Escape
  React.useEffect(() => {
    if (!open) return
    const handlePointer = (e: MouseEvent | PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowDown' && !open) { setOpen(true); e.preventDefault() }
    }
    window.addEventListener('mousedown', handlePointer)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('mousedown', handlePointer)
      window.removeEventListener('keydown', handleKey)
    }
  }, [open])

  // Close when focus leaves component (tabbing out)
  const onWrapperBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current) return
    if (!wrapperRef.current.contains(e.relatedTarget as Node)) setOpen(false)
  }

  const current = options.find(o => o.value === value)

  return (
    <div ref={wrapperRef} onBlur={onWrapperBlur} className={cn('relative', className)}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="h-10 w-full rounded-md border border-[hsl(var(--border))] bg-white px-3 text-sm flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
      >
        <span className="truncate">{current?.label || 'Select'}</span>
        <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" /></svg>
      </button>
      {open && (
        <div className="absolute z-40 mt-1 w-full rounded-md border border-[hsl(var(--border))] bg-white shadow-md overflow-hidden">
          <ul role="listbox" aria-activedescendant={value} className="max-h-64 overflow-y-auto text-sm">
            {options.map(o => (
              <li key={o.value} role="option" aria-selected={o.value === value}>
                <button
                  type="button"
                  onClick={() => { onChange(o.value); setOpen(false); btnRef.current?.focus() }}
                  className={cn('w-full text-left px-3 py-2 hover:bg-[hsl(var(--primary))/10] focus:bg-[hsl(var(--primary))/15] focus:outline-none', o.value===value && 'bg-[hsl(var(--primary))/15] font-medium')}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
