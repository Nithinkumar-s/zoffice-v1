import React from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { chartColors } from './Theme'

interface SparkPoint { x: string; y: number }
interface Props { data: SparkPoint[]; strokeWidth?: number }

const Sparkline: React.FC<Props> = ({ data, strokeWidth = 2 }) => {
  const c = chartColors()
  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, bottom: 4, left: 0, right: 0 }}>
          <Line type="monotone" dataKey="y" stroke={c.primary} strokeWidth={strokeWidth} dot={false} activeDot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Sparkline
