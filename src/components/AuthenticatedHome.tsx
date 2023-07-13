import React from 'react'
import DateTime from './DateTime'
import { CreateCategory } from './CreateCategory'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/db'
import { category } from '@/db/schema'
import { sql } from 'drizzle-orm'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

const AuthenticatedHome = async () => {
  const session = await getAuthSession()

  const categories = await db
    .select()
    .from(category)
    .where(sql`${category.userId}= ${session?.user.id}`)

  return (
    <main className="mt-24 flex min-h-screen w-screen flex-col items-center space-y-24 p-4">
      <div className="flex w-4/5 flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <DateTime />
        <div className="flex flex-col items-center justify-center gap-8">
          <CreateCategory />
          <Link
            href="/create-task"
            className={cn(
              buttonVariants({
                className:
                  'flex w-full items-center gap-2 border hover:bg-secondary/10',
              }),
            )}
          >
            <AiOutlinePlus />
            <h1>New task</h1>
          </Link>
        </div>
      </div>

      <div className="grid w-4/5 grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat) => (
          <h1 key={cat.id} className="text-secondary">
            {cat.name}
          </h1>
        ))}
      </div>
    </main>
  )
}

export default AuthenticatedHome
