'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartComponent({ logs }: { logs: any[] }) {
  const data = logs.map(log => ({
    date: new Date(log.created_at).toLocaleDateString(),
    stress: log.stress_level || 0,
    anxiety: log.anxiety_level || 0,
    depression: log.depression_level || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="stress" fill="#9C0808" radius={[4, 4, 0, 0]} />
        <Bar dataKey="anxiety" fill="#FBBF24" radius={[4, 4, 0, 0]} />
        <Bar dataKey="depression" fill="#60A5FA" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
