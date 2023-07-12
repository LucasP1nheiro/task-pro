import React from 'react'
import DateTime from './DateTime'
import { CreateCategory } from './CreateCategory'

const AuthenticatedHome = () => {
  return (
    <main className="mt-24 min-h-screen w-screen p-4">
      <div className="flex w-full flex-col justify-around gap-4 lg:flex-row lg:items-end">
        <DateTime />
        <CreateCategory />
      </div>
    </main>
  )
}

export default AuthenticatedHome
