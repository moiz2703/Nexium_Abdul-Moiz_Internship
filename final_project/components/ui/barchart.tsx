'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type LogEntry = {
  created_at: string;
  stress_level: number | null;
  anxiety_level: number | null;
  depression_level: number | null;
};

export default function BarChartComponent({ logs }: { logs: LogEntry[] }) {

  const data = logs.map(log => ({
    date: new Date(log.created_at).toLocaleDateString(),
    stress: log.stress_level || 0,
    anxiety: log.anxiety_level || 0,
    depression: log.depression_level || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid stroke='#ffffff22' strokeDasharray="3 3" strokeWidth={0.3}/>
        <XAxis dataKey="date" tickMargin={12}  style={{ fontSize: 13 }}/>
        <YAxis domain={[0, 10]} tickMargin={12}/>
        <Tooltip
          contentStyle={{
            backgroundColor: 'black',
            border: '1px solid #444',
            borderRadius: '6px',
            color: 'white',
            maxHeight: 150,
            overflowY: 'auto',
          }}
          itemStyle={{ color: 'white' }}
          cursor={{ fill: '#ffffff22' }}
        />

        <Legend wrapperStyle={{ marginTop: 20 }}/>
        <Bar dataKey="stress" fill="#0e45ac" radius={[4, 4, 0, 0]} />
        <Bar dataKey="anxiety" fill="#2ef0f7" radius={[4, 4, 0, 0]} />
        <Bar dataKey="depression" fill="#0a7e86" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
