import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "KadiBoss - Gestion d'Entreprise PWA",
  description: "Application PWA professionnelle pour la gestion de votre entreprise : ventes, clients, stock et analytics. Interface moderne et intuitive.",
  keywords: ["gestion entreprise", "ventes", "stock", "clients", "PWA", "business management"],
  authors: [{ name: "KadiBoss Team" }],
  creator: "KadiBoss",
  publisher: "KadiBoss",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kadiboss.app'),
  openGraph: {
    title: "KadiBoss - Gestion d'Entreprise PWA",
    description: "Application PWA professionnelle pour la gestion de votre entreprise",
    url: 'https://kadiboss.app',
    siteName: 'KadiBoss',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "KadiBoss - Gestion d'Entreprise PWA",
    description: "Application PWA professionnelle pour la gestion de votre entreprise",
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
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff6b35" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KadiBoss" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider defaultTheme="system" storageKey="kadiboss-ui-theme">
            {children}
          </ThemeProvider>
          <Toaster />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
