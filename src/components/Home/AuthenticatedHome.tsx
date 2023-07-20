import React from 'react'
import DateTime from '../DateTime'
import { CreateCategory } from '../CreateCategory'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/db'
import { task } from '@/db/schema'
import { sql } from 'drizzle-orm'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import TasksCard from '../Card/TasksCard'
import CalendarTasks from '../Calendar/CalendarTasks'

const AuthenticatedHome = async () => {
  const session = await getAuthSession()

  const tasks = await db
    .select()
    .from(task)
    .where(sql`${task.userId}= ${session?.user.id}`)
    .orderBy(task.expiresAt)

  return (
    <main className="my-24 flex min-h-screen w-screen flex-col items-center space-y-24 p-4">
      <div className="flex w-4/5 flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <DateTime />
        <div className="flex  w-auto items-center justify-end gap-4">
          <CreateCategory />
          <Link
            href="/create-task"
            className={cn(
              buttonVariants({
                className:
                  'flex w-[200px] items-center gap-2 border hover:bg-secondary/10',
              }),
            )}
          >
            <AiOutlinePlus />
            <h1>New task</h1>
          </Link>
        </div>
      </div>

      <CalendarTasks tasks={tasks} />

      <div className="grid w-4/5 grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tasks.map((task) => (
          <TasksCard
            key={task.id}
            taskId={task.id}
            title={task.title}
            expiresAt={task.expiresAt}
            priority={task.priority}
          />
        ))}
      </div>
    </main>
  )
}

export default AuthenticatedHome
