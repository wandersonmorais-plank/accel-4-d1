"use client"

import { createContext, useCallback, useContext, useState } from "react"
import type {
  BuilderContextValue,
  ButtonElementProps,
  CanvasElement,
  CarouselProps,
  ElementType,
  PaletteKey,
  TextProps,
} from "./builder-types"

export const DEFAULT_PROPS: {
  text: TextProps
  button: ButtonElementProps
  carousel: CarouselProps
} = {
  text: {
    content: "Edit this text",
    fontSize: "base",
    fontWeight: "normal",
    align: "left",
    color: "inherit",
  },
  button: {
    label: "Click me",
    variant: "primary",
    size: "md",
    href: "",
  },
  carousel: {
    images: [],
    autoplay: false,
    interval: 3000,
  },
}

const BuilderContext = createContext<BuilderContextValue | null>(null)

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [elements, setElements] = useState<CanvasElement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [palette, setPaletteState] = useState<PaletteKey>("default")
  const [backgroundImageObjectUrl, setBackgroundImageObjectUrl] = useState<string | null>(null)
  const [isPreview, setIsPreview] = useState(false)

  const addElement = useCallback((type: ElementType) => {
    const id = crypto.randomUUID()
    const newElement = { id, type, props: { ...DEFAULT_PROPS[type] } } as CanvasElement
    setElements((prev) => [...prev, newElement])
  }, [])

  const removeElement = useCallback((id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }, [])

  const updateElement = useCallback(
    (
      id: string,
      patch: Partial<TextProps> | Partial<ButtonElementProps> | Partial<CarouselProps>,
    ) => {
      setElements((prev) =>
        prev.map((el) =>
          el.id === id ? ({ ...el, props: { ...el.props, ...patch } } as CanvasElement) : el,
        ),
      )
    },
    [],
  )

  const reorderElements = useCallback((activeId: string, overId: string) => {
    setElements((prev) => {
      const oldIndex = prev.findIndex((el) => el.id === activeId)
      const newIndex = prev.findIndex((el) => el.id === overId)
      if (oldIndex === -1 || newIndex === -1) return prev
      const next = [...prev]
      const [moved] = next.splice(oldIndex, 1)
      next.splice(newIndex, 0, moved)
      return next
    })
  }, [])

  const selectElement = useCallback((id: string | null) => {
    setSelectedId(id)
  }, [])

  const setBackgroundImage = useCallback((url: string | null) => {
    setBackgroundImageObjectUrl(url)
  }, [])

  const setPalette = useCallback((key: PaletteKey) => {
    setPaletteState(key)
  }, [])

  const togglePreviewMode = useCallback(() => {
    setIsPreview((prev) => !prev)
  }, [])

  const clearCanvas = useCallback(() => {
    setElements([])
    setSelectedId(null)
  }, [])

  const value: BuilderContextValue = {
    elements,
    selectedId,
    palette,
    backgroundImageObjectUrl,
    isPreview,
    addElement,
    removeElement,
    updateElement,
    reorderElements,
    selectElement,
    setBackgroundImage,
    setPalette,
    togglePreviewMode,
    clearCanvas,
  }

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
}

export function useBuilderContext(): BuilderContextValue {
  const ctx = useContext(BuilderContext)
  if (!ctx) throw new Error("useBuilderContext must be used within BuilderProvider")
  return ctx
}
