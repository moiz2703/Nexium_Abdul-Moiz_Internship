import { Montserrat } from 'next/font/google';
import { Poppins ,Roboto} from 'next/font/google';
import { Button } from './button';
import Link from 'next/link';
import { Play, Telescope } from 'lucide-react';

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

  const handleExploreClick = () => {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`${montserrat.variable} min-h-screen text-white flex flex-col justify-center items-center px-4`}>
      <div className="text-center space-y-7 max-w-3xl mx-auto -mt-12">
        <p className={`${roboto.className} max-w-3xl mx-auto text-md text-gray-300 mb-2`}>
            Welcome to <span className="text-yellow-400 font-bold tracking-wide italic">MindWave</span>
        </p>
        <h1 className={`${poppins.className} text-6xl md:text-8xl bg-gradient-to-r from-green-400 via-cyan-200 to-blue-300 text-transparent bg-clip-text mx-auto`}>
          Build Your Mind <br /> Boost Your Life
        </h1>
        <p className={`${roboto.className} max-w-6xl mx-auto text-lg text-gray-300 mt-10`}>
        A powerful mental wellness companion to help you reflect, relax, and grow stronger every day — nurturing emotional clarity, inner peace, and long-term resilience.
        </p>
        <div className="flex items-center justify-center gap-8 mt-18">
          <Button onClick={handleExploreClick} className="bg-blue-800 px-4 py-5 w-35 font-semibold transition transform hover:scale-105 hover:shadow-lg hover:bg-blue-700 active:scale-95 active:bg-blue-800">
          <Telescope className='fill-current'/>
            Explore
          </Button>
          <Link href='/login'>
          <Button className="bg-white text-black px-4 py-5 w-35 hover:bg-gray-400 font-semibold hover:scale-105 transition hover:shadow-lg active:scale-95 active:bg-gray-white">
           <Play className='fill-current'/>
            Get Started
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}