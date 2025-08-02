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

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
    type Day = typeof days[number];

    const logsPerDay: Record<Day, Log[]> = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    };

    logs.forEach(log => {
      const day = new Date(log.created_at).toLocaleDateString('en-US', { weekday: 'short' }) as Day;
      if (logsPerDay[day]) {
        logsPerDay[day].push(log);
      }
    });


  return (
    <div className='bg-black min-h-screen w-full overflow-hidden'>
      <div className="p-6 space-y-6 text-white border border-white/10 mx-4 my-6 rounded-2xl bg-white/5">
        <h1 className="text-2xl font-bold">Welcome back, {name} 👋</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-black border border-white/10 rounded-xl p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Mental Health Summary</h2>
              <div className="flex gap-4 text-right mr-2">
                <StatBox label="Stress" value={avg('stress_level')} />
                <StatBox label="Anxiety" value={avg('anxiety_level')} />
                <StatBox label="Depression" value={avg('depression_level')} />
              </div>
            </div>
            <div className="mt-12 h-24 w-full rounded-lg bg-gradient-to-r from-green-400 via-yellow-400 to-red-600 flex items-center justify-center text-black font-semibold text-lg">
              {getHealthMessage(avg('stress_level'), avg('anxiety_level'), avg('depression_level'))}
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-black border border-white/10 rounded-xl p-3 space-y-4">
            <h3 className="font-semibold text-lg mb-2">Mood Logging Activity</h3>

            <div className="text-sm text-gray-300 flex flex-col relative h-16">
              <span className="text-sm text-gray-400">Last logged:</span>

              <span className="absolute top-8 text-5xl md:text-6xl font-bold text-[#2ef0f7]">
                {lastLogTime !== null ? `${lastLogTime}` : '--'}
                <span className="text-base font-medium text-gray-400 ml-1">hrs ago</span>
              </span>
            </div>

            <div className="flex justify-end gap-6 h-24 mr-2">
                {days.map((day) => (
                  <div key={day} className="flex flex-col items-center justify-end gap-1">
                    <div
                      className="w-4 bg-blue-700 rounded"
                      style={{ height: `${logsPerDay[day].length * 12}px` }}
                    />
                    <span className="text-xs text-white">{day}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="bg-black border border-white/10 rounded-xl p-4 w-full md:w-full">
          <h3 className="text-lg font-semibold mb-2">Overall Mental Health</h3>
          <MentalHealthAreaChart logs={logs} />
        </div>
         
        <div className='flex flex-col md:flex-row gap-4 w-full'> 
         <div className="bg-black border border-white/10 rounded-xl p-4 w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-2">Stress, Anxiety & Depression (Past Week)</h3>
          <div className="flex justify-center mt-9 mr-10">
            <BarChartComponent logs={logs} />
          </div>
        </div>

         <div className="w-full md:w-1/2 bg-black border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-lg mb-2">Mood Distribution</h3>
            <PieChartComponent logs={logs} />
        </div>
       </div>
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
