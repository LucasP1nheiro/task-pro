'use client'

import { toast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from '../ui/alert-dialog'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { BsTrash } from 'react-icons/bs'
import { useMutation } from 'react-query'
import LoadingSpinner from '../Loading/LoadingSpinner'

interface DeleteCategoryProps {
  categoryId: number
}

const DeleteCategory = ({ categoryId }: DeleteCategoryProps) => {
  const router = useRouter()
  const { mutate: deleteCategory, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.delete(
          `/api/category/?categoryId=${categoryId}`,
        )
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
            description: 'You cannot delete this category.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          toast({
            title: 'Unauthorized',
            description: 'You have to be logged in to delete a category.',
            variant: 'destructive',
          })
        }
      }
    },
    onSuccess: (data) => {
      toast({
        title: 'Congratulations!',
        description: `The category ${data} has been deleted successfully`,
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
          className="flex w-full items-center gap-2 px-12 py-[18px] lg:w-fit"
        >
          <BsTrash size={16} className="fill-primary" />
          <p className="text-sm">Delete Category</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-secondary">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            By confirmig you are deleting this category and all tasks related to
            it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="flex items-center gap-4 bg-secondary"
            onClick={() => deleteCategory()}
          >
            {isLoading && <LoadingSpinner />}
            <p>Continue</p>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCategory
