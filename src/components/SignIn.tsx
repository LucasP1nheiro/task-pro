import React from 'react'
import Link from 'next/link'
import GoogleAuth from './GoogleAuth'

const SignIn = () => {
  return (
    <div className="w-[400px] flex flex-col px-10 py-5 gap-12 rounded-md border">
        <h1 className="text-secondary text-2xl font-semibold">Sign in</h1>

        <GoogleAuth />

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-primary text-tertiary px-2 ">
                Or continue with
              </span>
            </div>
        </div>

        {/*sign in form*/}

        <div className="flex items-center gap-4">
            <p
                className="text-tertiary text-sm"
            >
                Don&apos;t have an account?
            </p>
            <Link
                href="/sign-up"
                className="text-secondary text-sm font-bold "
            >
                Sign up
            </Link>

        </div>
    </div>
  )
}

export default SignIn