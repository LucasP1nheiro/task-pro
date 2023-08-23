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
        <main className="space-y-10 p-4 pt-24 ">
          <div className="mx-auto flex w-full justify-end gap-4 lg:w-3/5">
            <SaveTask taskData={selectedTask} />
            <DeleteTask taskId={selectedTask.id} />
          </div>
          <Editor initialContent={selectedTask.description} />
        </main>
      )}
    </>
  )
}

export default Page
