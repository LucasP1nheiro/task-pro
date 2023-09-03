import { db } from '@/db'
import { task } from '@/db/schema'
import { getAuthSession } from '@/lib/auth'
import { CreateTaskValidator, UpdateTaskValidator } from '@/lib/validators/task'
import { sql } from 'drizzle-orm'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { categoryId, description, title, priority, expiresAt } =
      CreateTaskValidator.parse(body)

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

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    console.log(body)

    const {
      title,
      categoryId,
      taskId,
      description,
      priority,
      expiresAt,
      status,
    } = UpdateTaskValidator.parse(body)

    console.log('validou', {
      body,
    })

    await db
      .update(task)
      .set({
        title,
        description,
        categoryId,
        priority,
        expiresAt,
        status,
      })
      .where(sql`${task.id} = ${taskId}`)

    const [currentData] = await db
      .select()
      .from(task)
      .where(sql`${task.id} = ${taskId}`)

    const data = currentData.title

    return new Response(data, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new Response('Error on updating task.', { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const url = new URL(req.url)
    const taskId = url.searchParams.get('taskId')

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
