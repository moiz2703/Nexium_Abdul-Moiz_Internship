'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Log = {
  stress_level: number | null;
  anxiety_level: number | null;
  depression_level: number | null;
  created_at: string;
};

export default function MentalHealthAreaChart({ logs }: { logs: Log[] }) {
  // Step 1: Prepare data
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
            <stop offset="0%" stopColor="#34D399" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#EF4444" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#34D399"
          fill="url(#colorScore)"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
