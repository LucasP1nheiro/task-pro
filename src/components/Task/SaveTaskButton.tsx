'use client'

import React from 'react'
import { Button } from '../ui/button'
import { toast } from '@/hooks/use-toast'
import axios, { AxiosError } from 'axios'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import LoadingSpinner from '../Loading/LoadingSpinner'
import { useTaskStore } from '@/store/tasks'
import { CreateTaskPayload, UpdateTaskPayload } from '@/lib/validators/task'

const SaveTaskButton = () => {
  const pathName = usePathname()

  const router = useRouter()

  const { id } = useParams()

  const taskId = parseInt(id)

  const { categoryId, description, title, priority, expiresAt, status } =
    useTaskStore()

  // creating a new task
  const { mutate: createTask, isLoading: isCreateLoading } = useMutation({
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
    onSuccess: () => {
      toast({
        title: 'Congratulations!',
        description: `The task has been created successfully`,
        variant: 'default',
      })
      router.push(`/`)
    },
  })

  // updating existing task
  const { mutate: updateTask, isLoading: isUpdateLoading } = useMutation({
    mutationFn: async () => {
      const payload: UpdateTaskPayload = {
        title,
        categoryId,
        taskId,
        description,
        priority,
        expiresAt,
        status,
      }

      await axios.patch('/api/task', payload)
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          toast({
            title: 'Error',
            description: 'Something went wrong with the update',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          toast({
            title: 'Unauthorized',
            description: 'You have to be logged in to update a task',
            variant: 'destructive',
          })
        }
      }
    },
    onSuccess: () => {
      toast({
        title: 'Congratulations!',
        description: `Your task has been updated successfully`,
        variant: 'default',
      })
      router.push('/')
    },
  })

  return (
    <Button
      type="submit"
      variant={'secondary'}
      onClick={() =>
        pathName === '/create-task' ? createTask() : updateTask()
      }
      className="flex w-full items-center gap-4"
    >
      {(isCreateLoading || isUpdateLoading) && <LoadingSpinner />}
      <p>{pathName === '/create-task' ? 'Create' : 'Update'}</p>
    </Button>
  )
}

export default SaveTaskButton
