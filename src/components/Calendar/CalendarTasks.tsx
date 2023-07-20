'use client'

import { formatDate } from '@/lib/formatDate'
import { Calendar } from '../ui/calendar'
import { Task } from '@/db/schema'
import { isSameMonth } from 'date-fns'
import { UseCalendarTasks } from '@/hooks/useCalendarTasks'
import { Button } from '../ui/button'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface CalendarTasksProps {
  tasks: Task[]
}

const CalendarTasks = ({ tasks }: CalendarTasksProps) => {
  const {
    setMonth,
    month,
    monthHasTasks,
    currentPage,
    dateList,
    today,
    handlePrevPage,
    pageRange,
    handleNextPage,
    hasNextPage,
  } = UseCalendarTasks({ tasks })

  return (
    <section className="flex w-4/5 justify-between gap-10">
      <Calendar
        mode="multiple"
        selected={dateList}
        className="items-center rounded-md border"
        defaultMonth={today}
        disabled={{ before: today }}
        onMonthChange={setMonth}
      />
      <div className="flex w-full flex-col items-center rounded-md border">
        {monthHasTasks && (
          <div className="relative flex h-1/6 w-full items-center justify-center gap-4 rounded-t-md border-b bg-primary">
            <Button
              size="icon"
              className="h-fit w-fit border bg-secondary p-2 duration-300 hover:bg-secondary/90"
              onClick={() => handlePrevPage()}
              disabled={currentPage === 1}
            >
              <AiOutlineLeft className="text-primary" />
              <span className="sr-only">Previous page</span>
            </Button>
            <p className="text-secondary">{currentPage}</p>
            <Button
              size="icon"
              className="h-fit w-fit border bg-secondary p-2 duration-300 hover:bg-secondary/90"
              onClick={() => handleNextPage()}
              disabled={!hasNextPage}
            >
              <AiOutlineRight className="text-primary" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        )}
        {tasks
          .filter(
            (task) => task.expiresAt && isSameMonth(month, task.expiresAt),
          )
          .map(
            (task, index) =>
              index < currentPage * pageRange &&
              index >= (currentPage - 1) * pageRange && (
                <div
                  key={task.id}
                  className={
                    index % 2 === 0
                      ? 'flex h-1/6 w-full items-center justify-between p-4'
                      : 'flex h-1/6 w-full items-center justify-between bg-secondary/10 p-4'
                  }
                >
                  {task.expiresAt && (
                    <p className="text-tertiary">
                      {formatDate(task.expiresAt)}
                    </p>
                  )}
                  <h1 className="text-secondary">{task.title}</h1>
                </div>
              ),
          )}
        {!monthHasTasks && (
          <div className="flex h-full w-full items-center justify-center">
            <h1 className="text-xl font-bold text-secondary">
              There is no tasks expiring this month
            </h1>
          </div>
        )}
      </div>
    </section>
  )
}

export default CalendarTasks
