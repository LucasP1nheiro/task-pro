import { db } from "@/db";
import { category } from "@/db/schema";
import { getAuthSession } from "@/lib/auth";
import { CategoryValidator } from "@/lib/validators/category";
import { sql } from "drizzle-orm";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', {status: 401})
        }

        const body = await req.json()

        const {name} = CategoryValidator.parse(body)

        const categoryAlreadyExists = await db.select().from(category).where(sql`${category.name} = ${name} AND ${category.userId} = ${session.user.id}`)

        if (categoryAlreadyExists.length > 0) {
            return new Response('Category already exists', {status:409})
        }

        await db.insert(category).values({
            name: name,
            userId: session.user.id
        })

        return new Response(name)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, {status: 422})
        }

        return new Response('Error on creating category.', {status: 500})
    }
}