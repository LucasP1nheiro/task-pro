import { Task } from '@/db/schema'
import { isSameMonth } from 'date-fns'
import { useState, useEffect } from 'react'

interface CalendarTasksProps {
  tasks: Task[]
}

export const UseCalendarTasks = ({ tasks }: CalendarTasksProps) => {
  const pageRange = 5

  const dateList = tasks
    .map((task) => {
      return task.expiresAt
    })
    .filter((date: Date | null): date is Date => date !== null)
  const today = new Date()
  const [month, setMonth] = useState<Date>(today)

  const [monthHasTasks, setMonthHasTasks] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)

  // Update the 'monthHasTasks' when month change an reset pagination
  useEffect(() => {
    const hasMatchingTasks = tasks.some(
      (task) => task.expiresAt && isSameMonth(month, task.expiresAt),
    )
    setMonthHasTasks(hasMatchingTasks)
    setCurrentPage(1)
  }, [tasks, month])

  const tasksByMonth = tasks.filter(
    (task) => task.expiresAt && isSameMonth(month, task.expiresAt),
  )

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const hasNextPage = tasksByMonth.length > currentPage * pageRange

  return {
    setMonth,
    month,
    monthHasTasks,
    currentPage,
    setCurrentPage,
    dateList,
    today,
    handlePrevPage,
    handleNextPage,
    pageRange,
    hasNextPage,
  }
}
