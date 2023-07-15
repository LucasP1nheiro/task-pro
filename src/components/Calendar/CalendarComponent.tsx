'use client'

import React, { useEffect, useState } from 'react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { useTaskStore } from '@/store/tasks'

const CalendarComponent = () => {
  const [date, setDate] = useState<Date>(new Date())

  const today = new Date()

  const { updateExpiresAt } = useTaskStore()

  useEffect(() => {
    console.log(date.toDateString())
    updateExpiresAt(date)
  }, [date, updateExpiresAt])

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(selectedDate) => {
          if (selectedDate) {
            setDate(selectedDate)
          }
        }}
        className="items-center rounded-md border"
        defaultMonth={date}
        disabled={{ before: today }}
      />
      <p className="text-center text-tertiary">
        You picked {format(date, 'PP')}.
      </p>
    </div>
  )
}

export default CalendarComponent
