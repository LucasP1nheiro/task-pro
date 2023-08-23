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
  currentCategoryId?: number | null
}

const SelectCategory = ({
  label,
  categoryItems,
  currentCategoryId,
}: SelectCategoryProps) => {
  const [currentSelected, setCurrentSelected] = useState<string | undefined>(
    undefined,
  )
  const { updateCategoryId } = useTaskStore()

  useEffect(() => {
    if (currentSelected) {
      const newCategory = categoryItems.filter((item) => {
        let aux: number | null = null
        if (item.name === currentSelected) {
          aux = item.categoryId
        }

        return aux
      })

      updateCategoryId(newCategory[0].categoryId)
    }
  }, [currentSelected, categoryItems, updateCategoryId])

  const currentCategory =
    categoryItems.find((category) => {
      return category.categoryId === currentCategoryId
    }) ?? undefined

  // const currentCategoryName = currentCategory?.name ?? null

  useEffect(() => {
    setCurrentSelected(currentCategory?.name)
  }, [currentCategory])

  return (
    <Select
      onValueChange={(value: string) => setCurrentSelected(value)}
      value={currentSelected ?? undefined}
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
