import Link from 'next/link'
import React from 'react'
import GoogleAuth from './GoogleAuth'
import Logo from '../Header/Logo'

const SignUp = () => {
  return (
    <div className="flex max-w-[500px] flex-col items-center gap-6 rounded-md border px-5 py-5 md:px-10">
      <Logo hasText />
      <h1 className="text-3xl font-semibold text-secondary">Sign Up</h1>

      <p className="text-md mx-auto max-w-xs text-center text-tertiary">
        Welcome! By continuing, you are setting up a TaskPro account
      </p>

      <GoogleAuth />

      <div className="flex items-center gap-4">
        <p className="text-md text-tertiary">Already have an account?</p>
        <Link href="/sign-in" className="text-md font-bold text-secondary ">
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default SignUp
