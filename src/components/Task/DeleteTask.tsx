'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
} from '../ui/alert-dialog'
import React from 'react'
import { Button } from '../ui/button'

import { toast } from '@/hooks/use-toast'

import axios, { AxiosError } from 'axios'

import { useMutation } from 'react-query'
import LoadingSpinner from '../Loading/LoadingSpinner'
import { useRouter } from 'next/navigation'
import { BsTrash } from 'react-icons/bs'

interface DeleteTaskProps {
  taskId: number
}

const DeleteTask = ({ taskId }: DeleteTaskProps) => {
  const router = useRouter()
  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.delete(`/api/task/?taskId=${taskId}`)
        console.log(`Deleted task with title: ${data}`)
        return data as string
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: 'Something went wrong',
            description: 'You cannot delete this task.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          toast({
            title: 'Unauthorized',
            description: 'You have to be logged in to delete a task',
            variant: 'destructive',
          })
        }
      }
    },
    onSuccess: (data) => {
      toast({
        title: 'Congratulations!',
        description: `The task ${data} has been deleted successfully`,
        variant: 'default',
      })
      router.push('/')
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'secondary'}
          size="sm"
          className="flex items-center gap-2 px-12"
        >
          <BsTrash size={18} className="fill-primary" />
          <p className="text-sm">Delete task</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-secondary">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="flex items-center gap-4 bg-secondary"
            onClick={() => deleteTask()}
          >
            {isLoading && <LoadingSpinner />}
            <p>Continue</p>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTask
