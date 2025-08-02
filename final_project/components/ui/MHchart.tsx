'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Log = {
  stress_level: number | null;
  anxiety_level: number | null;
  depression_level: number | null;
  created_at: string;
};

export default function MentalHealthAreaChart({ logs }: { logs: Log[] }) {
  const chartData = logs.map((log, index) => {
    const score = 100 - (((log.stress_level || 0) + (log.anxiety_level || 0) + (log.depression_level || 0)) / 3 * 10);
    return {
      date: new Date(log.created_at).toLocaleDateString(),
      score,
      change: index === 0 ? 0 : score - (100 - (((logs[index - 1].stress_level || 0) + (logs[index - 1].anxiety_level || 0) + (logs[index - 1].depression_level || 0)) / 3 * 10)),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#152cb3" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#0a429c" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#759ae2" strokeWidth={0.3} vertical={false}/>
        <XAxis dataKey="date" stroke="#9CA3AF" style={{ strokeWidth: 0.5 }} tick={{ fontSize: 12, fill: '#D1D5DB' }} tickMargin={15}/>
        <YAxis domain={[0, 100]} stroke="#9CA3AF" style={{ strokeWidth: 0 }} tick={{fontSize:12}} tickMargin={12}/>

        <Tooltip 
          content={({ active, payload, label }) => {
          if (active && payload && payload.length) {
            return (
              <div className="bg-black text-white p-3 rounded shadow-lg">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs">Score: {payload[0].value.toFixed(1)}%</p>
                <p className="text-xs">Change: {payload[0].payload.change.toFixed(1)}%</p>
              </div>
            );
          }
          return null;
        }}
/>
        <Area
          type="monotone"
          dataKey="score"
          stroke="#102e92"
          fill="url(#colorScore)"
          strokeWidth={2}
           activeDot={{
            r: 5,
            fill: 'blue',
            stroke: 'blue',
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
