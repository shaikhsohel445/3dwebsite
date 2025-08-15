import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Import Exports - Future of Smart Trading",
  description:
    "Revolutionizing global import-export with AI-driven insights, predictive analytics, and intelligent supply chain optimization.",
  generator: "v0.app",
  keywords: "AI, import, export, global trade, artificial intelligence, supply chain, trading platform",
  authors: [{ name: "AI Import Exports" }],
  creator: "AI Import Exports",
  publisher: "AI Import Exports",
  robots: "index, follow",
  openGraph: {
    title: "AI Import Exports - Future of Smart Trading",
    description:
      "Revolutionizing global import-export with AI-driven insights and intelligent supply chain optimization.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Import Exports - Future of Smart Trading",
    description:
      "Revolutionizing global import-export with AI-driven insights and intelligent supply chain optimization.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' fontSize='90'>🤖</text></svg>"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
