"use client"

// Providers — client boundary for React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { BuilderProvider, useBuilderContext } from "@/lib/builder-context"
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

const PALETTE_CLASSES = ["palette-rose", "palette-violet", "palette-emerald", "palette-amber"] as const

function GlobalBuilderApplier() {
  const { palette } = useBuilderContext()

  useEffect(() => {
    const root = document.documentElement
    PALETTE_CLASSES.forEach((cls) => root.classList.remove(cls))
    if (palette !== "default") {
      root.classList.add(`palette-${palette}`)
    }
  }, [palette])

  return null
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <GlobalSettingsApplier />
        <BuilderProvider>
          <GlobalBuilderApplier />
          {children}
        </BuilderProvider>
      </SettingsProvider>
    </QueryClientProvider>
  )
}
