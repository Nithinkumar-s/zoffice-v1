import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { chartColors } from './Theme'

export interface AllocationDatum { name: string; value: number }
interface Props { data: AllocationDatum[] }

const AllocationDonut: React.FC<Props> = ({ data }) => {
  const c = chartColors()
  const palette = [c.primary, c.secondary, c.accent]
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={4} stroke={c.border} strokeWidth={1}>
            {data.map((_, i) => (
              <Cell key={i} fill={palette[i % palette.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: `1px solid ${c.border}`, fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AllocationDonut
