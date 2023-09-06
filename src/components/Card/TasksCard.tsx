import Link from 'next/link'
import React from 'react'
import { formatDate } from '@/lib/formatDate'
import { cn } from '@/lib/utils'

interface TasksCardProps {
  taskId: number
  title: string
  priority: 'low' | 'medium' | 'high' | null | undefined
  expiresAt: Date | null
}

const TasksCard = ({ title, priority, expiresAt, taskId }: TasksCardProps) => {
  return (
    <Link
      href={`/task/${taskId}`}
      className="flex w-full flex-col space-y-10 rounded-2xl bg-primary p-4 duration-300 hover:bg-primary/50"
    >
      <h1 className="font-bold capitalize text-secondary">{title}</h1>
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
        {expiresAt && (
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-tertiary">Expiration: </p>
            <p className="text-sm font-semibold text-secondary">
              {formatDate(expiresAt)}
            </p>
          </div>
        )}
        <p
          className={cn(
            'w-fit rounded-xl px-3 py-1 text-sm font-semibold capitalize text-white',
            {
              'bg-red-600': priority === 'high',
              'bg-yellow-500': priority === 'medium',
              'bg-green-600': priority === 'low',
            },
          )}
        >
          {priority}
        </p>
      </div>
    </Link>
  )
}

export default TasksCard
