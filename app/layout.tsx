import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Person Directory",
  description: "Manage your contacts in one place",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container py-4">
                <h1 className="text-2xl font-bold">Person Directory</h1>
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'