// Root layout — wraps all pages with global styles and React Query provider
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Welcome to Wand's accel project",
  description: "Next.js + Tailwind + shadcn/ui + React Query",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
