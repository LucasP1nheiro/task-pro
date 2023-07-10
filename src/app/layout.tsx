import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TaskPro',
  description: 'Task management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"bg-primary " + inter.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>

  )
}
