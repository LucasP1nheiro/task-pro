import React from 'react'
import { ButtonProps } from '../ui/button'
import Image from 'next/image'

interface FloatingMenuButtonProps extends ButtonProps {
  src: string
  title: string
  description: string
}

const FloatingMenuButton = ({
  title,
  description,
  src,
  ...props
}: FloatingMenuButtonProps) => {
  return (
    <>
      <button
        className="flex min-w-[280px] items-center gap-2 rounded p-2 duration-300 hover:bg-primary/10 data-[active=true]:bg-primary data-[active=true]:text-secondary"
        {...props}
      >
        <Image
          src={src}
          alt="Text"
          className="rounded border"
          width={48}
          height={48}
        />
        <div className="flex flex-col gap-2 text-left">
          <span className="text-sm font-semibold">{title}</span>
          <span className="text-xs ">{description}</span>
        </div>
      </button>
    </>
  )
}

export default FloatingMenuButton
