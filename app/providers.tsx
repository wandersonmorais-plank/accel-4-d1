"use client"

// Providers — client boundary for React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { SettingsProvider, useSettings } from "@/lib/settings-context"

function GlobalSettingsApplier() {
  const { theme, font } = useSettings()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    const map = {
      inter: "var(--font-inter)",
      playfair: "var(--font-playfair)",
      "space-grotesk": "var(--font-space-grotesk)",
    } as const
    document.documentElement.style.setProperty("--font-active", map[font])
  }, [font])

  return null
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <GlobalSettingsApplier />
        {children}
      </SettingsProvider>
    </QueryClientProvider>
  )
}

