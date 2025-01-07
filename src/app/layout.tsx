import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TanstackProvider } from './components/providers/tanstact-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Blog App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>{children}</TanstackProvider> 

      </body>
    </html>
  )
}
