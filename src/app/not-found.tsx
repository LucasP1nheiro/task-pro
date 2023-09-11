import React from 'react'

const NotFound = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-5 text-center">
      <h1 className="text-3xl font-bold text-secondary">There was a problem</h1>
      <p className="text-xl text-tertiary">
        We could not find the page you are looking for or you don&lsquo;t have
        access to it
      </p>
    </main>
  )
}

export default NotFound
