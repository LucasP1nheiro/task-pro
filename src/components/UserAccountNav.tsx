'use client'

import { User } from 'next-auth'
import React, {FC} from 'react'
import {FiLogOut} from 'react-icons/fi'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface UserAccountNavProps {
    user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({user}) => {
  return (
    <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar 
                user={user} 
                className="h-8 w-8"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-primary border' align='end'>
           <div className="flex items-center justify-start gap-2 p-2">
                <div
                    className='flex flex-col space-y-1 leading-none'
                >
                    {user.name && <p className='font-medium text-secondary'>{user.name}</p>}
                    {user.email && <p className='w-[200px] truncate text-sm text-tertiary'>{user.email}</p>}
                </div>
           </div>

           <DropdownMenuSeparator className="bg-tertiary" />

           <DropdownMenuItem asChild className='bg-primary'>
                <Link
                    href='/'
                    className='text-secondary'
                >
                    Home
                </Link>
           </DropdownMenuItem>

           <DropdownMenuItem  
                asChild
                className='bg-primary flex items-center gap-2' 
                onSelect={(event) => {
                    event.preventDefault()
                    signOut({
                        callbackUrl: `${window.location.origin}/sign-in`
                    })                    
                }}
            >
                <p className='text-secondary'>Sign out</p>
           </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default UserAccountNav