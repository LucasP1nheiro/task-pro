import Editor from '@/components/Editor/Editor'
import SaveTask from '@/components/Task/SaveTask'

import React from 'react'

const Page = () => {
  return (
    <main className="space-y-10 p-4 pt-24 ">
      <div className="mx-auto flex w-full justify-end lg:w-3/5">
        <SaveTask />
      </div>
      <Editor />
    </main>
  )
}

export default Page
