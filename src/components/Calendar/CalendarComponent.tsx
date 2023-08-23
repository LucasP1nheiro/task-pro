'use client'

import React, { useEffect, useState } from 'react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { useTaskStore } from '@/store/tasks'

interface CalendarComponentProps {
  currentDate?: Date | null | undefined
}

const CalendarComponent = ({ currentDate }: CalendarComponentProps) => {
  const [date, setDate] = useState<Date>(new Date())

  const { updateExpiresAt } = useTaskStore()

  useEffect(() => {
    updateExpiresAt(date)
  }, [date, updateExpiresAt])

  useEffect(() => {
    if (currentDate) {
      setDate(currentDate)
    }
  }, [currentDate])

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
        required
      />
      <p className="text-center text-tertiary">
        You picked {format(date, 'PP')}.
      </p>
    </div>
  )
}

export default CalendarComponent
