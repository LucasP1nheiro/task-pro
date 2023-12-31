'use client'

import { User } from 'next-auth'
import React, { FC } from 'react'
import { FiLogOut } from 'react-icons/fi'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { AiOutlineHome } from 'react-icons/ai'

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" border bg-primary" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && (
              <p className="font-medium capitalize text-secondary">
                {user.name}
              </p>
            )}
            {user.email && (
              <p className="w-[300px] truncate text-sm text-tertiary">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator className="bg-tertiary" />

        <DropdownMenuItem asChild className="bg-primary">
          <Link href="/" className="flex items-center gap-2">
            <AiOutlineHome className="fill-secondary" size={18} />
            <p className="text-md text-secondary">Home</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            })
          }}
        >
          <FiLogOut className="text-secondary" size={18} />
          <p className="text-md text-secondary">Sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
