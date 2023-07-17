import { db } from '@/db'
import { task } from '@/db/schema'
import { getAuthSession } from '@/lib/auth'
import { sql } from 'drizzle-orm'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    const body = await req.json()

    const { taskId } = body

    const [selectedTask] = await db
      .select({ userId: task.userId, title: task.title })
      .from(task)
      .where(sql`${task.id} = ${taskId}`)

    const taskBelongsToUser = selectedTask.userId === session.user.id

    if (!taskBelongsToUser) {
      return new Response("You're not authorized to delete this task.", {
        status: 409,
      })
    }

    await db.delete(task).where(sql`${task.id} = ${taskId}`)

    const data = selectedTask.title

    return new Response(data, { status: 201 })
  } catch (error) {
    return new Response('Error on deleting task.', { status: 500 })
  }
}
