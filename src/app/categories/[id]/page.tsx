import Board from '@/components/Board/Board'
import BoardContainer from '@/components/Board/BoardContainer'
import TasksCard from '@/components/Card/TasksCard'
import DeleteCategory from '@/components/Category/DeleteCategory'
import NewTaskAnchor from '@/components/Task/NewTaskAnchor'
import { db } from '@/db'
import { category, task } from '@/db/schema'
import { getAuthSession } from '@/lib/auth'
import { sql } from 'drizzle-orm'

interface PageProps {
  params: {
    id: number
  }
}

const page = async ({ params }: PageProps) => {
  const session = await getAuthSession()

  const [selectedCategory] = await db
    .select()
    .from(category)
    .where(sql`${category.id} = ${params.id}`)

  const tasks = await db
    .select()
    .from(task)
    .where(
      sql`${task.userId}= ${session?.user.id} AND ${task.categoryId} = ${params.id}`,
    )
    .orderBy(task.expiresAt)

  return (
    <>
      {tasks.length === 0 && (
        <main className="flex min-h-screen w-screen flex-col items-center p-4">
          <div className="mt-36 flex w-5/6 flex-col items-center justify-end gap-4 lg:flex-row">
            <DeleteCategory categoryId={params.id} />
            <NewTaskAnchor />
          </div>
          <div className="flex h-[50vh] w-full items-center justify-center text-center">
            <h1 className="text-2xl text-secondary">
              There is no task in the category{' '}
              <strong>&quot;{selectedCategory.name}&quot;</strong>
            </h1>
          </div>
        </main>
      )}

      {tasks.length > 0 && (
        <main className="my-36 flex min-h-screen w-screen flex-col items-center  space-y-24 p-4">
          <div className="flex w-full flex-col justify-between gap-4 space-y-4 md:w-3/4 lg:flex-row lg:items-center">
            <h1 className="text-5xl font-bold capitalize text-secondary">
              {selectedCategory.name}
            </h1>
            <div className="flex w-auto flex-col items-center justify-end gap-4 lg:flex-row">
              <DeleteCategory categoryId={params.id} />
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
      )}
    </>
  )
}

export default page
