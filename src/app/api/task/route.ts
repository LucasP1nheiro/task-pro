import { db } from '@/db'
import { task } from '@/db/schema'
import { getAuthSession } from '@/lib/auth'
import { TaskValidator } from '@/lib/validators/task'
import { sql } from 'drizzle-orm'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    console.log(body)

    // const { title, categoryId, description, priority, expiresAt } =

    const { title, categoryId, description, priority, expiresAt } =
      TaskValidator.parse(body)

    console.log('passou')

    const taskAlreadyExists = await db
      .select()
      .from(task)
      .where(
        sql`${task.title} = ${title} AND ${task.userId} = ${session.user.id}`,
      )

    if (taskAlreadyExists.length > 0) {
      return new Response('Category already exists', { status: 409 })
    }

    await db.insert(task).values({
      title,
      categoryId,
      userId: session.user.id,
      description,
      status: 'todo',
      priority,
      expiresAt,
    })

    return new Response(title)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Error on creating task.', { status: 500 })
  }
}
