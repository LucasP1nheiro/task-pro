import { db } from '@/db'
import { category, task } from '@/db/schema'
import { getAuthSession } from '@/lib/auth'
import { CategoryValidator } from '@/lib/validators/category'
import { sql } from 'drizzle-orm'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { name } = CategoryValidator.parse(body)

    const categoryAlreadyExists = await db
      .select()
      .from(category)
      .where(
        sql`${category.name} = ${name} AND ${category.userId} = ${session.user.id}`,
      )

    if (categoryAlreadyExists.length > 0) {
      return new Response('Category already exists', { status: 409 })
    }

    await db.insert(category).values({
      name,
      userId: session.user.id,
    })

    const [insertedCategory] = await db
      .select()
      .from(category)
      .where(
        sql`${category.name} = ${name} AND ${category.userId} = ${session.user.id}`,
      )

    return new Response(`${insertedCategory.id}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Error on creating category.', { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const url = new URL(req.url)
    const categoryId = url.searchParams.get('categoryId')

    const [selectedCategory] = await db
      .select({ userId: category.userId, title: category.name })
      .from(category)
      .where(sql`${category.id} = ${categoryId}`)

    const categoryBelongsToUser = selectedCategory.userId === session.user.id

    if (!categoryBelongsToUser) {
      return new Response("You're not authorized to delete this task.", {
        status: 409,
      })
    }

    const tasksRelatedToCategory = await db
      .select()
      .from(task)
      .where(sql`${task.categoryId} = ${categoryId}`)

    const tasksId = tasksRelatedToCategory.map((task) => {
      return task.id
    })

    // deleting every task related to this category
    tasksId.map(async (id) => {
      await db.delete(task).where(sql`${task.id} = ${id}`)
    })

    await db.delete(category).where(sql`${category.id} = ${categoryId}`)

    const data = selectedCategory.title

    return new Response(data, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Error on creating category.', { status: 500 })
  }
}
