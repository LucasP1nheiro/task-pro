import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import { ThemeProvider } from '@/components/Theme/theme-provider'
import Providers from '@/components/Providers/Providers'

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
      <body className={'bg-primary ' + inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
