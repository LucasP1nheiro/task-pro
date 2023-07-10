import Image from 'next/image'
import logo from '../../public/logo.svg'
import Link from 'next/link'
import { Heading1 } from 'lucide-react'

interface LogoProps {
  hasText?: boolean
}

const Logo = ({hasText}:LogoProps) => {
  return (
    <Link
      href='/'
      className="flex items-center gap-2 justify-center"
    >
        <Image 
          src={logo} 
          priority 
          alt='Logo' 
          className='h-5 w-5'
        />

        {hasText && (<h1 className='text-secondary font-medium'>TaskPro</h1>)} 
    </Link>
  )
}

export default Logo