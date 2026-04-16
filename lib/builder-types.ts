export type ElementType = "text" | "button" | "carousel"

export type TextProps = {
  content: string
  fontSize: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"
  fontWeight: "normal" | "semibold" | "bold"
  align: "left" | "center" | "right"
  color: string
}

export type ButtonElementProps = {
  label: string
  variant: "primary" | "secondary" | "outline"
  size: "sm" | "md" | "lg"
  href: string
}

export type CarouselProps = {
  /** Preview URLs (e.g. `URL.createObjectURL` results). */
  images: string[]
  autoplay: boolean
  /** Autoplay interval in milliseconds. */
  interval: number
}

export type CanvasElement =
  | { id: string; type: "text"; props: TextProps }
  | { id: string; type: "button"; props: ButtonElementProps }
  | { id: string; type: "carousel"; props: CarouselProps }

export type PaletteKey = "default" | "rose" | "violet" | "emerald" | "amber"

export interface BuilderState {
  elements: CanvasElement[]
  selectedId: string | null
  palette: PaletteKey
  /** `URL.createObjectURL` result for the canvas background, if any. */
  backgroundImageObjectUrl: string | null
  isPreview: boolean
}

export interface BuilderContextValue extends BuilderState {
  setSelectedId: (id: string | null) => void
  setPalette: (palette: PaletteKey) => void
  setBackgroundImageObjectUrl: (url: string | null) => void
  setIsPreview: (isPreview: boolean) => void
}
