import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import config from '../site.config.json'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: `${config.businessName} | Professional Services`,
  description: config.tagline,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950 text-white`}>{children}</body>
    </html>
  )
}
