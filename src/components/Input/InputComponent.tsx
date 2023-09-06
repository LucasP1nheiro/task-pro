'use client'

import { Input } from '../ui/input'

import { useTaskStore } from '@/store/tasks'
import { useEffect } from 'react'

interface InputComponentProps {
  currentTitle?: string
}

const InputComponent = ({ currentTitle }: InputComponentProps) => {
  const { updateTitle, title } = useTaskStore()

  useEffect(() => {
    if (currentTitle) {
      updateTitle(currentTitle)
    } else {
      updateTitle('')
    }
  }, [currentTitle, updateTitle])

  return (
    <Input
      id="name"
      className="col-span-3 bg-primary text-sm text-secondary placeholder:text-tertiary"
      placeholder="Enter the title of the task here"
      onChange={(e) => updateTitle(e.target.value)}
      value={title}
    />
  )
}

export default InputComponent
