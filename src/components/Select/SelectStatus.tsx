'use client'

import { useTaskStore } from '@/store/tasks'
import {
  Select,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
} from '../ui/select'
import React, { useEffect, useState } from 'react'

interface SelectStatusProps {
  label: string
  currentStatus?: 'todo' | 'in progress' | 'completed' | null
}

const SelectStatus = ({ label, currentStatus }: SelectStatusProps) => {
  const statusItems = ['todo', 'in progress', 'completed']

  const [value, setValue] = useState<string | undefined>(undefined)

  const { updateStatus } = useTaskStore()

  useEffect(() => {
    if (currentStatus) {
      setValue(currentStatus)
    } else {
      setValue(undefined)
    }
  }, [currentStatus])
  return (
    <Select
      onValueChange={(newValue: string) => {
        if (
          newValue === 'todo' ||
          newValue === 'in progress' ||
          newValue === 'completed'
        ) {
          setValue(newValue)
          updateStatus(newValue)
        }
      }}
      value={value}
    >
      <SelectTrigger className="w-[180px] text-secondary">
        <SelectValue
          placeholder={`Select the ${label}`}
          className="text-secondary"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select the {label}</SelectLabel>
          {statusItems &&
            statusItems.map(
              (item) =>
                item && (
                  <SelectItem value={item} key={item}>
                    {item}
                  </SelectItem>
                ),
            )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectStatus
