import React from 'react'
import UserAccountNav from './UserAccountNav'
import { getAuthSession } from '@/lib/auth'
import Link from 'next/link'
import Logo from './Logo'
import { ThemeToggle } from './theme-toggle'


const Header = async () => {
  const session = await getAuthSession()

  return (
    <div
        className="w-screen bg-primary h-[10%] border-b flex items-center justify-around fixed top-0 z-50"
    >
        <Logo hasText/>

        <div
          className='flex items-center gap-4'
        >
          <ThemeToggle />

          {session?.user ? (
            <UserAccountNav user={session!.user}/>
          ) : (
            <Link
              href="/sign-in"
              className='flex items-center rounded bg-secondary hover:bg-secondary/75 px-2 py-1 duration-300'
            >
              <p className='text-xs text-primary'>Sign in</p>
            </Link>
          )}

        </div>
        
    </div>
  )
}

export default Header