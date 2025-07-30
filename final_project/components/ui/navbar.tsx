'use client';

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation';
import { Ghost } from 'lucide-react';

type NavbarProps = {
  variant: 'reflect' | 'dashboard'
}

export function Navbar({ variant }: { variant: 'reflect' | 'dashboard' }) {
  const router=useRouter();  

  const handleExploreClick = () => {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  try {
    return (
      <nav className='text-white py-2 px-6 translate-y-4 flex items-center relative'>
        <h2 className='text-xl font-bold'>
            MindWave
        </h2>
        {variant === 'reflect' && (
          <>
          <div className='absolute left-1/2 transform -translate-x-1/2 flex gap-4'>
          <Button className='bg-transparent hover:text-blue-200'>
            Home
          </Button>
            <Button variant="ghost" onClick={handleExploreClick} className='text-white'>
            About
            </Button>
            <Link href="/dashboard">
                <Button variant="outline" className='text-black'>
                    Dashboard
                </Button>
            </Link>
            </div>\
            <div className='ml-auto flex gap-4'>
              <Link href={"/home"}>
              <Button variant={'outline'} className='text-black'>
                Logout
              </Button>
              </Link>
            <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="cursor-pointer w-10 h-10">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className='text-white bg-green-800 text-xl font-bold'>U</AvatarFallback>
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
        <nav/>
        </>
        )}
        {variant === 'dashboard' && (
          <>
            <Link href="/dashboard/overview">Overview</Link>
            <Link href="/dashboard/settings">Settings</Link>
          </>
        )}
      </nav>
    )
  } catch (err) {
    console.error('Navbar error:', err)
    return <div>Failed to load navbar</div>
  }
}
