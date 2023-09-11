import React from 'react'
import { SheetTrigger, SheetContent, Sheet, SheetClose } from '../ui/sheet'
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai'
import { Button } from '../ui/button'
import Link from 'next/link'
import { db } from '@/db'
import { category } from '@/db/schema'
import { sql } from 'drizzle-orm'
import { getAuthSession } from '@/lib/auth'
import { Avatar, AvatarFallback } from '../ui/avatar'

const SideMenu = async () => {
  const session = await getAuthSession()

  const categories = await db
    .select()
    .from(category)
    .where(sql`${category.userId}= ${session?.user.id}`)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <AiOutlineMenu size={24} className="fill-secondary" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full w-full bg-primary pt-16">
        <nav>
          <ul className="space-y-4">
            <li>
              <SheetClose asChild>
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-md p-2 duration-300 hover:bg-secondary/10"
                >
                  <AiOutlineHome className="fill-secondary" size={24} />
                  <p className="text-md text-secondary">Home</p>
                </Link>
              </SheetClose>
            </li>

            <h1 className="border-t p-2 font-bold text-secondary">
              Categories
            </h1>
            <div className="h-[800px] space-y-4 overflow-hidden hover:overflow-y-scroll">
              {categories.map((category) => (
                <li key={category.id}>
                  <SheetClose asChild>
                    <Link
                      href={`/categories/${category.id}`}
                      className="flex items-center gap-2 rounded-md p-2 duration-300 hover:bg-secondary/10"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          {category.name.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-secondary">{category.name}</span>
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </div>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default SideMenu
