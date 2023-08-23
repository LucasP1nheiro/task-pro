import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'

import { db } from '@/db'
import { Task, category } from '@/db/schema'
import { getAuthSession } from '@/lib/auth'
import { sql } from 'drizzle-orm'
import CalendarComponent from '../Calendar/CalendarComponent'
import SelectCategory from '../Select/SelectCategory'
import InputComponent from '../Input/InputComponent'
import SelectPriority from '../Select/SelectPriority'
import SaveTaskButton from './SaveTaskButton'
import SelectStatus from '../Select/SelectStatus'

// it could receive a task data when the user is trying to update the task

interface SaveTaskProps {
  taskData?: Task
}

const SaveTask = async ({ taskData }: SaveTaskProps) => {
  const session = await getAuthSession()

  const categories = await db
    .select({ name: category.name, categoryId: category.id })
    .from(category)
    .where(sql`${category.userId}= ${session?.user.id}`)

  const priority = ['low', 'medium', 'high']

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'secondary'} size="sm" className="px-12">
          <p className="text-xs">{taskData ? 'Update task' : 'Save task'}</p>
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-8 overflow-y-scroll bg-primary">
        <SheetHeader>
          <SheetTitle className="text-secondary">Save task</SheetTitle>
          <SheetDescription className="text-tertiary">
            Save your task here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex w-full items-center justify-between gap-8">
          <Label htmlFor="name" className="text-right text-secondary">
            Title
          </Label>
          <InputComponent currentTitle={taskData?.title} />
        </div>
        <CalendarComponent currentDate={taskData?.expiresAt} />

        <SelectPriority
          label="priority"
          priorityItems={priority}
          currentPriority={taskData?.priority ?? null}
        />

        {categories.length > 0 && (
          <SelectCategory
            label="category"
            categoryItems={categories}
            currentCategoryId={taskData ? taskData.categoryId : null}
          />
        )}

        {taskData && (
          <SelectStatus label="status" currentStatus={taskData.status} />
        )}

        <SheetFooter>
          <SheetClose asChild>
            <SaveTaskButton />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SaveTask
