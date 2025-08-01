'use client';

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation';



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
          <Link href={"/reflect"}>
          <Button className='bg-transparent hover:text-blue-200 hover:bg-transparent'>
            Home
          </Button>
          </Link>
            <Button onClick={handleExploreClick} className='text-white hover:text-blue-200 bg-transparent hover:bg-transparent'>
            About
            </Button>
            <Link href="/dashboard">
                <Button className='text-white hover:text-blue-300 bg-transparent hover:bg-transparent'>
                    Dashboard
                </Button>
            </Link>
            </div>\
            <div className='ml-auto flex gap-4'>
              <Link href={"/"}>
              <Button  className='text-black bg-white hover:bg-gray-200'>
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
            <Button onClick={handleExploreClick} className='text-white hover:text-blue-200 bg-transparent hover:bg-transparent'>
            About
            </Button>
                <Button className='text-white hover:text-blue-200 bg-transparent hover:bg-transparent'>
                    Dashboard
                </Button>

            </div>\
            <div className='ml-auto flex gap-4'>
              <Link href={"/"}>
              <Button  className='text-black bg-white hover:bg-gray-200'>
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
          </>
        )}
      </nav>
    )
  } catch (err) {
    console.error('Navbar error:', err)
    return <div>Failed to load navbar</div>
  }
}
