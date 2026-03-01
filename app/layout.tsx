import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TawkChat } from '@/components/tawk-chat'
import { AnnouncementBar } from '@/components/announcement-bar'
import { Navbar } from '@/components/navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'ForzaHost - Hosting de Servidores de Juegos',
  description: 'Hosting de servidores de juegos de alto rendimiento. Minecraft, Valheim, Terraria y mas. Configuracion instantanea, proteccion DDoS, soporte 24/7.',
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <AnnouncementBar />
          <Navbar />
        </div>
        {children}
        <TawkChat />
        <Analytics />
      </body>
    </html>
  )
}
