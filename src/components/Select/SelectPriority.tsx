'use client'

import { useTaskStore } from '@/store/tasks'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '../ui/select'
import React, { useEffect, useState } from 'react'

interface SelectPriorityProps {
  label: string
  priorityItems: string[]
  currentPriority?: 'low' | 'high' | 'medium' | null | undefined
}

const SelectPriority = ({
  label,
  priorityItems,
  currentPriority,
}: SelectPriorityProps) => {
  const { updatePriority } = useTaskStore()

  const [value, setValue] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (currentPriority) {
      setValue(currentPriority)
      updatePriority(currentPriority)
    }
  }, [currentPriority, updatePriority])
  return (
    <Select
      onValueChange={(newValue: string) => {
        if (
          newValue === 'low' ||
          newValue === 'high' ||
          newValue === 'medium'
        ) {
          setValue(newValue)
          updatePriority(newValue)
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
          {priorityItems &&
            priorityItems.map(
              (item) =>
                (item === 'low' || item === 'medium' || item === 'high') && (
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

export default SelectPriority
