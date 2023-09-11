import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { buttonVariants } from '../ui/button'

const NewTaskAnchor = () => {
  return (
    <Link
      href="/create-task"
      className={cn(
        buttonVariants({
          className: 'flex w-full items-center gap-2 border lg:w-[200px] ',
          variant: 'secondary',
        }),
      )}
    >
      <AiOutlinePlus className="fill-primary" size={18} />
      <h1>New task</h1>
    </Link>
  )
}

export default NewTaskAnchor
