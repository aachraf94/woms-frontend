import type React from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "SonatrackEP - Gestion des opérations E&P en Algérie",
  description: "Système de gestion des opérations d'exploration et de production pétrolière en Algérie",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}


import './globals.css'