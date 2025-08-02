'use client';

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { usePathname, useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';



export function Navbar({ variant }: { variant: 'reflect' | 'dashboard' }) {
  const router=useRouter();  


  const handleExploreClick = () => {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handlelogout = async () =>{
    const {error} = await supabase.auth.signOut();
    if (error){
      console.error('Logout failed:', error.message);
    }
   

  }

  const pathname = usePathname();
  const isdash = pathname === "/dashboard"

  try {
    return (
      <nav className={`${isdash? "bg-black": "bg-transparent translate-y-4"} text-white py-2 px-6 flex items-center relative`}>
        <h2 className='text-xl font-bold'>
            MindWave
        </h2>
        {variant === 'reflect' && (
          <>
          <div className='absolute left-1/2 transform -translate-x-1/2 flex gap-4'>
          <Link href={"/reflect"}>
          <Button className='bg-transparent hover:text-blue-200 hover:bg-transparent'>
            Home
          </Button>
          </Link>
          <Link href="/dashboard">
            <Button className='text-white hover:text-blue-300 bg-transparent hover:bg-transparent'>
                Dashboard
            </Button>
          </Link>
          <Button onClick={handleExploreClick} className='text-white hover:text-blue-200 bg-transparent hover:bg-transparent'>
            About
          </Button>
            </div>\
            <div className='ml-auto flex gap-4'>
              <Link href={"/"}>
              <Button onClick={handlelogout} className='text-black bg-white hover:bg-gray-200 h-8 mt-1'>
                Logout
              </Button>
              </Link>
            <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="cursor-pointer w-10 h-10">
                <AvatarFallback className='text-red-400 bg-red-950 text-xl font-bold'>
                <User className='fill-current'/>  
                </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push('/change-password')}>
                Change Password
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/account')}>
                My Account
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
        )}
        {variant === 'dashboard' && (
          <>
          <div className='absolute left-1/2 transform -translate-x-1/2 flex gap-4'>
          <Link href={"/reflect"}>
          <Button className='bg-transparent hover:text-blue-200 hover:bg-transparent'>
            Home
          </Button>
          </Link>
          
          <Button className='text-white hover:text-blue-200 bg-transparent hover:bg-transparent'>
            Dashboard
          </Button>

          <Button onClick={handleExploreClick} className='text-white hover:text-blue-200 bg-transparent hover:bg-transparent'>
            About
          </Button>

            </div>\
            <div className='ml-auto flex gap-4'>
              <Link href={"/"}>
              <Button onClick={handlelogout} className='text-black bg-white hover:bg-gray-200 h-8 mt-1'>
                Logout
              </Button>
              </Link>
            <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="cursor-pointer w-10 h-10">
                <AvatarFallback className='text-red-400 bg-red-950 text-xl font-bold'>
                  <User className='fill-current'/>
                </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push('/change-password')}>
                Change Password
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/account')}>
                My Account
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
          </>
        )}
      </nav>
    )
  } catch (err) {
    console.error('Navbar error:', err)
    return <div>Failed to load navbar</div>
  }
}
