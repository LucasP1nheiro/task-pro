import SignUp from '@/components/Sign/SignUp'
import React from 'react'

const page = () => {
  return (
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20">
        <SignUp />
      </div>
    </div>
  )
}

export default page
