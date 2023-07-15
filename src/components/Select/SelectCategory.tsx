'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTaskStore } from '@/store/tasks'
import React, { useEffect, useState } from 'react'

interface SelectCategoryProps {
  label: string
  categoryItems: {
    name: string
    categoryId: number
  }[]
}

const SelectCategory = ({ label, categoryItems }: SelectCategoryProps) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const { updateCategoryId } = useTaskStore()

  useEffect(() => {
    if (currentCategory) {
      const newCategory = categoryItems.filter((item) => {
        let aux: number | null = null
        if (item.name === currentCategory) {
          aux = item.categoryId
        }

        return aux
      })

      updateCategoryId(newCategory[0].categoryId)
    }
  }, [currentCategory, categoryItems, updateCategoryId])

  return (
    <Select onValueChange={(value: string) => setCurrentCategory(value)}>
      <SelectTrigger className="w-[180px] text-secondary">
        <SelectValue
          placeholder={`Select the ${label}`}
          className="text-secondary"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select the {label}</SelectLabel>

          {categoryItems.map((item) => (
            <SelectItem value={item.name} key={item.categoryId}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectCategory
