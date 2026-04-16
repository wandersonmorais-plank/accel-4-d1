"use client"

import { createContext, useContext, useMemo, useState } from "react"

export type Theme = "light" | "dark"
export type FontChoice = "inter" | "playfair" | "space-grotesk"
export type AnimationChoice = "fade-in" | "slide-up" | "slide-down" | "scale-in" | "blur-in"

export interface Settings {
  theme: Theme
  title: string
  description: string
  font: FontChoice
  animation: AnimationChoice
}

export interface SettingsContextValue extends Settings {
  setTheme: (v: Theme) => void
  setTitle: (v: string) => void
  setDescription: (v: string) => void
  setFont: (v: FontChoice) => void
  setAnimation: (v: AnimationChoice) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [title, setTitle] = useState("Welcome to Wand's accel project")
  const [description, setDescription] = useState(
    "Next.js · Tailwind · shadcn/ui · React Query",
  )
  const [font, setFont] = useState<FontChoice>("inter")
  const [animation, setAnimation] = useState<AnimationChoice>("fade-in")

  const value = useMemo<SettingsContextValue>(
    () => ({
      theme,
      title,
      description,
      font,
      animation,
      setTheme,
      setTitle,
      setDescription,
      setFont,
      setAnimation,
    }),
    [theme, title, description, font, animation],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider")
  return ctx
}

