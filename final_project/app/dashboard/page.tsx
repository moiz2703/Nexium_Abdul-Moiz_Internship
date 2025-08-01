'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PieChartComponent from '@/components/ui/piechart';
import MentalHealthAreaChart from '@/components/ui/MHchart';
import BarChartComponent from '@/components/ui/barchart';

type Log = {
  stress_level: number | null;
  anxiety_level: number | null;
  depression_level: number | null;
  agent_summary: string | null;
  suggestions: string | null;
  created_at: string;
};

export default function Dashboard() {
  const [name, setName] = useState('');
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const getUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error("User not found");
        return;
      }

      setName(user.user_metadata?.full_name || '');

     const { data, error } = await supabase
    .from('reflections')
    .select(`
      stress_level,
      anxiety_level,
      depression_level,
      agent_summary,
      suggestions,
      created_at,
      mood_logs!inner(user_id)
    `)
    .eq('mood_logs.user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(7);


      if (error) {
        console.error("Error fetching reflections:", error.message);
        return;
      }
      if (!data || data.length === 0) {
        console.warn("No reflections found for this user.");
      } else {
        console.log("Fetched logs:", data);
        data.forEach((log, i) => {
          console.log(`Log ${i + 1}:`, {
            stress: log.stress_level,
            anxiety: log.anxiety_level,
            depression: log.depression_level,
            created_at: log.created_at,
          });
        });
      }

      setLogs(data || []);


    };

    getUserAndData();
  }, []);

type NumericLogKey = 'stress_level' | 'anxiety_level' | 'depression_level';

const avg = (key: NumericLogKey): number => {
  if (logs.length === 0) return 0;
  const validLogs = logs.filter(log => log[key] !== null) as { [K in NumericLogKey]: number }[];
  if (validLogs.length === 0) return 0;

  const sum = validLogs.reduce((total, log) => total + log[key], 0);
  return Math.round((sum / validLogs.length) * 100) / 100;
};

  const lastLogTime = logs[0]?.created_at
    ? Math.floor((Date.now() - new Date(logs[0].created_at).getTime()) / (1000 * 60 * 60))
    : null;

  return (
    <div className="p-4 space-y-6 text-white border border-white/10 mx-4 my-6 rounded-2xl bg-black">
        <h1 className="text-2xl font-bold text-center">Welcome back, {name} 👋</h1>

        {/* Top Row: Summary + Pie Chart + Last Log */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Mental Health Summary */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Mental Health Summary</h2>
              <div className="flex gap-4 text-right">
                <StatBox label="Stress" value={avg('stress_level')} />
                <StatBox label="Anxiety" value={avg('anxiety_level')} />
                <StatBox label="Depression" value={avg('depression_level')} />
              </div>
            </div>
            <div className="h-24 w-full rounded-lg bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 flex items-center justify-center text-black font-semibold text-lg">
              {getHealthMessage(avg('stress_level'), avg('anxiety_level'), avg('depression_level'))}
            </div>
          </div>

          {/* Middle: Pie Chart */}
          <div className="w-full md:w-1/3 bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-lg mb-2">Mood Distribution</h3>
            <PieChartComponent logs={logs} />
          </div>

          {/* Right: Last Mood Log */}
          <div className="w-full md:w-1/3 bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-lg mb-2">Last Mood Log</h3>
            <p className="text-sm text-gray-300">
              {lastLogTime !== null ? `Last logged: ${lastLogTime} hours ago` : 'No logs yet'}
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Mental Health Score</h3>
          <MentalHealthAreaChart logs={logs} />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Stress, Anxiety & Depression (Past Week)</h3>
          <BarChartComponent logs={logs} />
        </div>
      </div>

  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

function getHealthMessage(stress: number, anxiety: number, depression: number) {
  const avg = (stress + anxiety + depression) / 3;
  if (avg < 3) return 'You’re doing great! 💚 Keep it up!';
  if (avg < 6) return 'You’re in a yellow zone. Take a breath 💛';
  return 'You seem stressed 😟 Consider reflecting or seeking support.';
}
