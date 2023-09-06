import SaveTask from '@/components/Task/SaveTask'
import { db } from '@/db'
import { task } from '@/db/schema'
import { getAuthSession } from '@/lib/auth'
import Editor from '../../../components/Editor/Editor'
import { sql } from 'drizzle-orm'
import React from 'react'
import DeleteTask from '@/components/Task/DeleteTask'

interface PageProps {
  params: {
    id: number
  }
}

const Page = async ({ params }: PageProps) => {
  const session = await getAuthSession()

  const [selectedTask] = await db
    .select()
    .from(task)
    .where(
      sql`${task.id}= ${params.id} AND ${task.userId} = ${session?.user.id}`,
    )

  return (
    <>
      {selectedTask && (
        <main className="min-h-screen w-screen space-y-10 p-4 pt-48">
          <div className="mx-auto flex w-full flex-col justify-end gap-8 lg:w-3/4 lg:flex-row">
            <SaveTask taskData={selectedTask} />
            <DeleteTask taskId={selectedTask.id} />
          </div>
          <div className="mx-auto w-full md:w-3/4">
            <Editor initialContent={selectedTask.description} />
          </div>
        </main>
      )}
    </>
  )
}

export default Page
