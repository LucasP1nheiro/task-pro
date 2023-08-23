'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { CreateCategoryPayload } from '@/lib/validators/category'
import axios, { AxiosError } from 'axios'
import LoadingSpinner from './Loading/LoadingSpinner'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export function CreateCategory() {
  const [categoryName, setCategoryName] = useState('')

  const router = useRouter()

  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateCategoryPayload = {
        name: categoryName,
      }

      const { data } = await axios.post('/api/category', payload)

      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: 'Category already exists',
            description: 'Choose a different category name.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 422) {
          toast({
            title: 'Invalid category name',
            description: 'Choose a name between 3 and 21 characters',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          toast({
            title: 'Unauthorized',
            description: 'You have to be logged in to create a category',
            variant: 'destructive',
          })
        }
      } else {
        toast({
          title: 'Error',
          description: 'There was an error on creating your category',
          variant: 'destructive',
        })
      }
    },
    onSuccess: (data) => {
      router.push(`/category/${data}`)
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex w-[200px] items-center gap-2 border hover:bg-secondary/10">
          <AiOutlinePlus className="fill-secondary" />
          <p>New category</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary text-secondary sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New category</DialogTitle>
          <DialogDescription className="text-tertiary">
            Create a new category for your tasks
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Category name"
              className="col-span-3 bg-primary"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="flex items-center gap-2"
            variant={'secondary'}
            disabled={categoryName.length === 0}
            onClick={() => createCategory()}
          >
            {isLoading && <LoadingSpinner />}
            <p>Save changes</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
