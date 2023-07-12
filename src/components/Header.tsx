import React from 'react'
import UserAccountNav from './UserAccountNav'
import { getAuthSession } from '@/lib/auth'
import Link from 'next/link'
import Logo from './Logo'
import { ThemeToggle } from './theme-toggle'

const Header = async () => {
  const session = await getAuthSession()

  return (
    <div className="fixed top-0 z-50 flex h-[10%] w-screen items-center justify-around border-b bg-primary">
      <Logo hasText />

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {session?.user ? (
          <UserAccountNav user={session!.user} />
        ) : (
          <Link
            href="/sign-in"
            className="flex items-center rounded bg-secondary px-2 py-1 duration-300 hover:bg-secondary/75"
          >
            <p className="text-xs text-primary">Sign in</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
