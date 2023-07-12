

import { getCurrentDateTime } from '@/lib/getCurrentDateTime'
import React from 'react'
import DateTime from './DateTime'
import { CreateCategory } from './CreateCategory'

const AuthenticatedHome = () => {
  const currentDateTime = getCurrentDateTime()

  return (
    <main className='min-h-screen w-screen mt-24 p-4'>
        <div className='w-full flex lg:items-end justify-around gap-4 flex-col lg:flex-row'>
            <DateTime />
            <CreateCategory />
        </div>
    </main>
  )
}

export default AuthenticatedHome