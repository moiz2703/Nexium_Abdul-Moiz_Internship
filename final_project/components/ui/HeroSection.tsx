import { Montserrat } from 'next/font/google';
import { Poppins ,Roboto} from 'next/font/google';
import { Button } from './button';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700'],
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700'],
});
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '600', '700'],
});


export default function HeroSection() {
  return (
    <section className={`${montserrat.variable} min-h-screen text-white flex flex-col justify-center items-center px-4`}>
      <div className="text-center space-y-7 max-w-3xl mx-auto -mt-12">
        <p className={`${roboto.className} max-w-3xl mx-auto text-md text-gray-300 mb-2`}>
            Welcome to <span className="text-yellow-400 font-bold tracking-wide italic">MindWave</span>
        </p>
        <h1 className={`${poppins.className} text-6xl md:text-8xl bg-gradient-to-r from-green-400 via-cyan-200 to-blue-400 text-transparent bg-clip-text mx-auto`}>
          Build Your Mind <br /> Boost Your Life
        </h1>
        <p className={`max-w-6xl mx-auto text-lg text-gray-300 mt-10`}>
        A powerful mental wellness companion to help you reflect, relax, and grow stronger every day — nurturing emotional clarity, inner peace, and long-term resilience.
        </p>
        <div className="flex items-center justify-center gap-8 mt-20">
          <Button className="bg-blue-800 px-4 py-5 w-35 font-semibold hover:scale-105 transition hover:shadow-lg hover:bg-blue-600">
            Explore
          </Button>
          <Button className="bg-white text-black px-4 py-5 w-35 hover:bg-gray-400 font-semibold hover:scale-105 transition hover:shadow-lg">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}