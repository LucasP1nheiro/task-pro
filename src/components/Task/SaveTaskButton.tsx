'use client'

import React from 'react'
import { Button } from '../ui/button'
import { toast } from '@/hooks/use-toast'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import LoadingSpinner from '../Loading/LoadingSpinner'
import { useTaskStore } from '@/store/tasks'
import { CreateTaskPayload } from '@/lib/validators/task'

const SaveTaskButton = () => {
  const router = useRouter()

  const { categoryId, description, title, priority, expiresAt } = useTaskStore()

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateTaskPayload = {
        categoryId,
        description,
        title,
        priority,
        expiresAt,
      }

      await axios.post('/api/task', payload)
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: 'Task already exists',
            description: 'Choose a different task name.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 422) {
          toast({
            title: 'Invalid task name',
            description: `${err.message}`,
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          toast({
            title: 'Unauthorized',
            description: 'You have to be logged in to create a task',
            variant: 'destructive',
          })
        }
      } else {
        toast({
          title: 'Error',
          description: 'There was an error on creating your task',
          variant: 'destructive',
        })
      }
    },
    onSuccess: (data) => {
      router.push(`/category/${data}`)
    },
  })

  return (
    <Button type="submit" variant={'secondary'} onClick={() => createTask()}>
      {isLoading && <LoadingSpinner />}
      Save
    </Button>
  )
}

export default SaveTaskButton
