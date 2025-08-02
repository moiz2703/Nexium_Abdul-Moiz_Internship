'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/reflect');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      if (error) setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-bl from-[#161424] via-[#000000] to-[#080e30]">
      <div className="w-100 h-95 p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10 shadow-xl">
        <h1 className="text-2xl font-semibold text-center mb-6 text-white">
          {isLogin ? 'Sign In' : 'Create Your Account'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-300"
              required
            />
          )}
          <input
            type="email"
            placeholder="Enter your email"
            name='email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-300"
            required
          />
          <input
            type="password"
            placeholder="password . . ."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-300"
            required
          />
          <Button
            type="submit"
            className="active:scale-95 w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-800 text-white font-semibold transition"
          >
            <LogIn />
            {isLogin ? 'Sign In' : 'Register'}
          </Button>
        </form>

        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

        <p className="text-sm text-gray-300 mt-6 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <Button
            type="submit"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 underline hover:text-blue-300 bg-transparent hover:bg-transparent p-0"
          >
            {isLogin ? 'Register now' : 'Sign in here'}
          </Button>
        </p>
      </div>
    </div>
  );
}
