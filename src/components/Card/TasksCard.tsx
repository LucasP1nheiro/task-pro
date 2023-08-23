import Link from 'next/link'
import React from 'react'
import { formatDate } from '@/lib/formatDate'

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
      className="space-y-10 rounded-md border p-4 duration-300 hover:bg-secondary/10"
    >
      <h1 className="font-semibold capitalize text-secondary">{title}</h1>
      <div className="flex items-center justify-between text-tertiary">
        <p>{priority}</p>
        {expiresAt && <p className="text-xs">{formatDate(expiresAt)}</p>}
      </div>
    </Link>
  )
}

export default TasksCard
