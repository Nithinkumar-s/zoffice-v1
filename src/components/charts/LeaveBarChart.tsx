import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { chartColors } from './Theme'

export interface LeaveDatum { type: string; days: number }
interface Props { data: LeaveDatum[] }

const LeaveBarChart: React.FC<Props> = ({ data }) => {
  const c = chartColors()
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 4, bottom: 4 }}>
          <CartesianGrid stroke={c.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="type" tickLine={false} axisLine={{ stroke: c.border }} fontSize={11} dy={4} />
            <YAxis width={30} tickLine={false} axisLine={{ stroke: c.border }} fontSize={11} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: `1px solid ${c.border}`, fontSize: 12 }} />
            <Bar dataKey="days" radius={[4,4,0,0]} fill={c.secondary} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LeaveBarChart
