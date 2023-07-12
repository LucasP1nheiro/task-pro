import React from 'react'
import Link from 'next/link'
import GoogleAuth from './GoogleAuth'

const SignIn = () => {
  return (
    <div className="flex w-[400px] flex-col gap-12 rounded-md border px-10 py-5">
      <h1 className="text-2xl font-semibold text-secondary">Sign in</h1>

      <GoogleAuth />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-primary px-2 text-tertiary ">
            Or continue with
          </span>
        </div>
      </div>

      {/* sign in form */}

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
