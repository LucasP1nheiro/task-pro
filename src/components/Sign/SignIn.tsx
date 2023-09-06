import React from 'react'
import Link from 'next/link'
import GoogleAuth from './GoogleAuth'
import Logo from '../Header/Logo'

const SignIn = () => {
  return (
    <div className="flex max-w-[500px] flex-col items-center gap-6 rounded-md border px-5 py-5 md:px-10">
      <Logo hasText />
      <h1 className="text-3xl font-semibold text-secondary">Sign In</h1>

      <p className="text-md mx-auto max-w-xs text-center text-tertiary">
        Welcome back! To access your TaskPro account, please sign in below.
      </p>

      <GoogleAuth />

      <div className="flex items-center gap-4">
        <p className="text-md text-tertiary">Don&apos;t have an account?</p>
        <Link href="/sign-up" className="text-md font-bold text-secondary ">
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default SignIn
