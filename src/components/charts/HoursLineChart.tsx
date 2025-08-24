import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { chartColors } from './Theme'

export interface HoursPoint { day: string; hours: number }

interface Props { data: HoursPoint[] }

const HoursLineChart: React.FC<Props> = ({ data }) => {
  const c = chartColors()
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, left: 4, bottom: 4 }}>
          <defs>
            <linearGradient id="hoursLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c.primary} stopOpacity={0.85} />
              <stop offset="100%" stopColor={c.primary} stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={c.border} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: c.border }} fontSize={11} dy={4} />
          <YAxis width={28} tickLine={false} axisLine={{ stroke: c.border }} fontSize={11} />
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: `1px solid ${c.border}`, fontSize: 12 }} />
          <Line type="monotone" dataKey="hours" stroke={c.primary} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} fill="url(#hoursLine)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HoursLineChart
