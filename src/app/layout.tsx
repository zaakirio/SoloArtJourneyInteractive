// src/app/layout.tsx
import '@/styles/globals.css'
import '@/styles/fonts.css'

export const metadata = {
  title: 'Solo Art Journey',
  description: 'Your App Description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/42dotSans-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}