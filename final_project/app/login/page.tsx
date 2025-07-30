'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';

export default function AuthPage() {
  const router = useRouter();

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

  return (
    <div className="w-full h-screen pt-0 mt-0 space-y-4 flex flex-col items-center justify-center bg-gradient-to-bl from-[#161424] via-[#000000] to-[#080e30]"
>
      <div>
        <h1 className='text-2xl text-center font-semibold bg-gradient-to-r from-cyan-400 via-green-200 to to-blue-500 bg-clip-text text-transparent'>
          Sign into your Account or Register
        </h1>
      </div>      
      <div className="w-full max-w-sm rounded-4xl bg-white/5 backdrop-blur border border-white/10 p-6 shadow-2xl">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563EB', 
                  brandAccent: '#1E40AF', 
                  inputBorder: '#4B5563',
                  inputText: '#E5E7EB',
                  anchorTextColor: '#A5B4FC',
                },
                radii: {
                  inputBorderRadius: '0.75rem',
                  buttonBorderRadius: '0.75rem',
                },
                fonts: {
                  bodyFontFamily: 'Inter, sans-serif',
                  buttonFontFamily: 'Inter, sans-serif',
                  inputFontFamily: 'Inter, sans-serif',
                },
              },
            },
          }}
          theme="dark"
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Your Email',
                password_label: 'Your Password',
                button_label: 'Sign In',
                link_text: 'Already have an account?',
              },
              sign_up: {
                email_label: 'Email Address',
                password_label: 'Create a Password',
                button_label: 'Register Now',
                link_text: 'Don’t have an account yet?',
              },
              forgotten_password: {
                email_label: 'Enter your email to reset',
                button_label: 'Send Reset Link',
                link_text: 'Forgot Password?',
              },
              magic_link: {
                email_input_label: 'Enter your email for magic link',
                button_label: 'Send Magic Link',
                link_text: 'Login with magic link',
              },
            },
          }}
        />
      </div>
    </div>
  );
}
