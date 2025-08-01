'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

type Log = {
  stress_level: number | null;
  anxiety_level: number | null;
  depression_level: number | null;
  created_at: string;
};

type Props = {
  logs: Log[];
};

export default function LineChartComponent({ logs }: Props) {
  const chartData = logs.map((log) => ({
    name: new Date(log.created_at).toLocaleDateString(), // X-axis label
    stress_level: log.stress_level ?? 0,
    anxiety_level: log.anxiety_level ?? 0,
    depression_level: log.depression_level ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="stress_level" stroke="#f43f5e" name="Stress" />
        <Line type="monotone" dataKey="anxiety_level" stroke="#facc15" name="Anxiety" />
        <Line type="monotone" dataKey="depression_level" stroke="#3b82f6" name="Depression" />
      </LineChart>
    </ResponsiveContainer>
  );
}
