import React from 'react'
import UserAccountNav from './UserAccountNav'
import { getAuthSession } from '@/lib/auth'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Logo from './Logo'


const Header = async () => {
  const session = await getAuthSession()

  return (
    <div
        className="w-screen h-[10%] border-b flex items-center justify-around fixed top-0"
    >
        <Logo hasText/>

        {session?.user ? (
          <UserAccountNav user={session!.user}/>
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants({variant: 'secondary', size: 'sm'})}
          >
            <p className='text-xs'>Sign in</p>
          </Link>
        )}
    </div>
  )
}

export default Header