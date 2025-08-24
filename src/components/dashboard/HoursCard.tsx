import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface HoursCardProps { className?: string }

const HoursCard: React.FC<HoursCardProps> = ({ className }) => {
  // Static mock data; could be replaced by props or context later
  const today = 6.5; const todayTarget = 8;
  const week = 32; const weekTarget = 40;
  const todayPct = Math.min(100, (today / todayTarget) * 100)
  const weekPct = Math.min(100, (week / weekTarget) * 100)
  const daysElapsed = 5 // if dynamic, could use Date
  // Average needed could be dynamic if day context changes
  const avgNeeded = (weekTarget - week) / Math.max(1, (5 - daysElapsed)) // avoid divide by zero

  // Sparkline data removed (no line chart per request)

  return (
  <Card className={`border-[hsl(var(--border))] shadow-sm bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 h-full flex flex-col ${className || ''}`}> 
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold tracking-wide uppercase">Hours</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">
        {/* Today */}
        <div className="space-y-1" aria-label="Today's hours">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground/90">Today</span>
            <span className="tabular-nums text-foreground">{today} / {todayTarget}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--secondary))] via-[hsl(var(--primary))] to-[hsl(var(--accent))]" style={{ width: `${todayPct}%` }} />
          </div>
        </div>
        {/* Week */}
        <div className="space-y-1" aria-label="Week hours">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground/90">Week</span>
            <span className="tabular-nums text-foreground">{week} / {weekTarget}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]" style={{ width: `${weekPct}%` }} />
          </div>
          <div className="flex items-center justify-end text-[11px] leading-tight mt-1">
            {isFinite(avgNeeded) && <span className="text-muted-foreground">Avg needed {avgNeeded.toFixed(1)}h</span>}
          </div>
        </div>
  {/* Leave Balance moved out to separate card */}
      </CardContent>
    </Card>
  )
}

export default HoursCard
