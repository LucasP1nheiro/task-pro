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
import React from 'react'

interface SelectPriorityProps {
  label: string
  priorityItems: string[]
}

const SelectPriority = ({ label, priorityItems }: SelectPriorityProps) => {
  const { updatePriority } = useTaskStore()

  return (
    <Select
      onValueChange={(value: string) => {
        if (value === 'low' || value === 'high' || value === 'medium') {
          updatePriority(value)
        }
      }}
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
