'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { AiOutlineGoogle } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import LoadingSpinner from '../Loading/LoadingSpinner'

const GoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        description: 'There was a problem logging with Google...',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className="flex w-full items-center justify-center gap-4 rounded-md border duration-300 hover:bg-white/10"
      onClick={loginWithGoogle}
    >
      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <>
          <AiOutlineGoogle className="fill-black dark:fill-white" size={24} />
          <h1 className="text-md text-secondary">Login with google</h1>
        </>
      )}
    </Button>
  )
}

export default GoogleAuth
