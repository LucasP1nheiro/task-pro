import React from 'react'
import DateTime from '../DateTime'
import { CreateCategory } from '../CreateCategory'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/db'
import { task } from '@/db/schema'
import { sql } from 'drizzle-orm'
import TasksCard from '../Card/TasksCard'
import Board from '../Board/Board'
import BoardContainer from '../Board/BoardContainer'
import NewTaskAnchor from '../Task/NewTaskAnchor'

const AuthenticatedHome = async () => {
  const session = await getAuthSession()

  const tasks = await db
    .select()
    .from(task)
    .where(sql`${task.userId}= ${session?.user.id}`)
    .orderBy(task.expiresAt)

  return (
    <main className="my-36 flex min-h-screen w-screen flex-col items-center justify-center space-y-24 p-4">
      <div className="flex w-full flex-col justify-between gap-4 space-y-4 md:w-3/4 lg:flex-row lg:items-center">
        <DateTime />
        <div className="flex w-auto flex-col items-center justify-end gap-4 lg:flex-row">
          <CreateCategory />
          <NewTaskAnchor />
        </div>
      </div>

      <Board>
        <BoardContainer title="to do">
          {tasks.map(
            (task) =>
              task.status === 'todo' && (
                <TasksCard
                  key={task.id}
                  taskId={task.id}
                  title={task.title}
                  expiresAt={task.expiresAt}
                  priority={task.priority}
                />
              ),
          )}
        </BoardContainer>
        <BoardContainer title="in progress">
          {tasks.map(
            (task) =>
              task.status === 'in progress' && (
                <TasksCard
                  key={task.id}
                  taskId={task.id}
                  title={task.title}
                  expiresAt={task.expiresAt}
                  priority={task.priority}
                />
              ),
          )}
        </BoardContainer>
        <BoardContainer title="completed">
          {tasks.map(
            (task) =>
              task.status === 'completed' && (
                <TasksCard
                  key={task.id}
                  taskId={task.id}
                  title={task.title}
                  expiresAt={task.expiresAt}
                  priority={task.priority}
                />
              ),
          )}
        </BoardContainer>
      </Board>
    </main>
  )
}

export default AuthenticatedHome
