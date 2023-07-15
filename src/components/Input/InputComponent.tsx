'use client'

import { Input } from '../ui/input'
import React from 'react'

import { useTaskStore } from '@/store/tasks'

const InputComponent = () => {
  const { updateTitle } = useTaskStore()

  return (
    <Input
      id="name"
      className="col-span-3 bg-primary text-xs text-secondary placeholder:text-tertiary"
      placeholder="Enter the title of the task here"
      onChange={(e) => updateTitle(e.target.value)}
    />
  )
}

export default InputComponent
