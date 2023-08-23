import Link from 'next/link'
import React from 'react'
import GoogleAuth from './GoogleAuth'
import Logo from '../Header/Logo'

const SignUp = () => {
  return (
    <div className="flex w-[400px] flex-col items-center gap-6 rounded-md border px-10 py-5">
      <Logo hasText />
      <h1 className="text-2xl font-semibold text-secondary">Sign Up</h1>

      <p className="mx-auto max-w-xs text-center text-sm text-tertiary">
        Welcome! By continuing, you are setting up a TaskPro account
      </p>

      <GoogleAuth />

      {/* sign in form */}

      <div className="flex items-center gap-4">
        <p className="text-sm text-tertiary">Already have an account?</p>
        <Link href="/sign-in" className="text-sm font-bold text-secondary ">
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default SignUp
