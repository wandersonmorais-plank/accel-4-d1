"use client"

import { createContext, useContext, useMemo, useState } from "react"
import type { BuilderContextValue, CanvasElement, PaletteKey } from "./builder-types"

const BuilderContext = createContext<BuilderContextValue | null>(null)

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [elements] = useState<CanvasElement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [palette, setPalette] = useState<PaletteKey>("default")
  const [backgroundImageObjectUrl, setBackgroundImageObjectUrl] = useState<string | null>(null)
  const [isPreview, setIsPreview] = useState(false)

  const value = useMemo<BuilderContextValue>(
    () => ({
      elements,
      selectedId,
      palette,
      backgroundImageObjectUrl,
      isPreview,
      setSelectedId,
      setPalette,
      setBackgroundImageObjectUrl,
      setIsPreview,
    }),
    [elements, selectedId, palette, backgroundImageObjectUrl, isPreview],
  )

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
}

export function useBuilder(): BuilderContextValue {
  const ctx = useContext(BuilderContext)
  if (!ctx) throw new Error("useBuilder must be used within BuilderProvider")
  return ctx
}
