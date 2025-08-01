'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

type Log = {
  stress_level: number | null;
  anxiety_level: number | null;
  depression_level: number | null;
  agent_summary: string | null;
  suggestions: string | null;
  created_at: string;
};

type Props = {
  logs: Log[];
};

const COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

export default function PieChartComponent({ logs }: Props) {
  const latestLog = logs.length > 0 ? logs[0] : null;

  const pieData = [
    {
      name: 'Stress',
      value: latestLog?.stress_level ?? 0,
    },
    {
      name: 'Anxiety',
      value: latestLog?.anxiety_level ?? 0,
    },
    {
      name: 'Depression',
      value: latestLog?.depression_level ?? 0,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
