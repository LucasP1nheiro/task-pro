import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Image from 'next/image'
import thumbnail from '../../assets/thumbnail.svg'
import Footer from '../Footer/Footer'

const LandingPage = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center space-y-12 p-4 pt-24 text-center">
      <h1 className="w-full text-2xl font-bold text-secondary md:text-4xl lg:w-1/2 xl:text-5xl">
        Management optimization for your tasks
      </h1>
      <h2 className="text-sm text-tertiary md:text-lg">
        Experience Effortless Task Management with TaskPro <br />
        Intuitive Simplicity, All for Free!
      </h2>
      <Link
        href="/sign-in"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-8 py-2 duration-300 hover:bg-secondary/90 md:w-fit"
      >
        <span>Get started</span>
        <AiOutlineArrowRight className="fill-primary" />
      </Link>
      <Image
        src={thumbnail}
        alt="Thumbnail"
        height={750}
        width={750}
        className="overflow-x-visible rounded-sm"
        priority
      />
      <Footer />
    </main>
  )
}

export default LandingPage
