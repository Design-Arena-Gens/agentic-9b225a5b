import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Code Improver - Master Your Programming Skills',
  description: 'Interactive coding challenges and exercises to improve your programming skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
