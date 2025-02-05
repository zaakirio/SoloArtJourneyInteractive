import '@/styles/globals.css'
import '@/styles/fonts.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Solo Art Journey',
    template: '%s | Solo Art Journey'
  },
  description: 'A comprehensive curriculum for self-taught artists. Learn art fundamentals, digital art, traditional techniques, and more through our structured learning path.',
  keywords: ['art curriculum', 'self-taught artist', 'art education', 'digital art', 'traditional art', 'art fundamentals', 'online art learning'],
  authors: [{ name: 'Solo Art Journey' }],
  creator: 'Solo Art Journey',
  publisher: 'Solo Art Journey',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Solo Art Journey',
    description: 'A comprehensive curriculum for self-taught artists',
    url: 'https://soloartjourney.com',
    siteName: 'Solo Art Journey',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
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
        <link rel="canonical" href="https://soloartjourney.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}