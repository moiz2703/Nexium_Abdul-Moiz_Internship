'use client';

import { usePathname } from 'next/navigation'
import { Navbar } from './ui/navbar'

export default function NavbarWrapper() {
  try {
    const pathname = usePathname()

    if (!pathname) return null

    if (pathname === '/reflect') {
      return <Navbar variant="reflect" />
    }

    if (pathname.startsWith('/dashboard')) {
      return <Navbar variant="dashboard" />
    }

    return null
  } catch (err) {
    console.error('NavbarWrapper error:', err)
    return null
  }
}
