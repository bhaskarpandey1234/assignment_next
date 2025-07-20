import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Recurring Date Picker',
  description: 'Create and visualize recurring date patterns with flexible scheduling options',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  )
}

