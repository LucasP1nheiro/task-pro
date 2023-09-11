import Editor from '@/components/Editor/Editor'
import SaveTask from '@/components/Task/SaveTask'
import { getAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'

import React from 'react'

const Page = async () => {
  const session = await getAuthSession()

  if (!session) {
    return notFound()
  }
  return (
    <main className="min-h-screen w-screen space-y-10 p-4 pt-36">
      <div className="mx-auto flex w-full justify-end gap-4 lg:w-3/4">
        <SaveTask />
      </div>
      <div className="mx-auto w-full md:w-3/4">
        <Editor />
      </div>
    </main>
  )
}

export default Page
