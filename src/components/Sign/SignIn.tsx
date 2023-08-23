import React from 'react'
import Link from 'next/link'
import GoogleAuth from './GoogleAuth'
import Logo from '../Header/Logo'

const SignIn = () => {
  return (
    <div className="flex w-[400px] flex-col items-center gap-6 rounded-md border px-10 py-5">
      <Logo hasText />
      <h1 className="text-2xl font-semibold text-secondary">Sign In</h1>

      <p className="mx-auto max-w-xs text-center text-sm text-tertiary">
        Welcome back! To access your TaskPro account, please sign in below.
      </p>

      <GoogleAuth />

      <div className="flex items-center gap-4">
        <p className="text-sm text-tertiary">Don&apos;t have an account?</p>
        <Link href="/sign-up" className="text-sm font-bold text-secondary ">
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default SignIn
