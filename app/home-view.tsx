"use client"

import { NavLinkButton } from "@/components/NavLinkButton"
import { PREVIEW_ANIMATION_CLASS } from "@/lib/preview-animation-classes"
import { useSettings } from "@/lib/settings-context"
import { useCallback, useEffect, useState } from "react"

export function HomeView() {
  const { title, description, font, animation, theme } = useSettings()
  const [animKey, setAnimKey] = useState(0)

  const bumpPreview = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimKey((k) => k + 1)
      })
    })
  }, [])

  useEffect(() => {
    bumpPreview()
  }, [animation, title, description, bumpPreview])

  const animClass = PREVIEW_ANIMATION_CLASS[animation]

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center p-24">
      <div className="absolute right-6 top-6">
        <NavLinkButton href="/dashboard">Dashboard</NavLinkButton>
      </div>

      <div key={animKey} className="max-w-2xl text-center">
        <h1 className={`text-4xl font-bold ${animClass} motion-reduce:animate-none`}>{title}</h1>
        <p className={`mt-4 text-muted-foreground ${animClass} motion-reduce:animate-none`}>{description}</p>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Font: {font} · Theme: {theme} · Animation: {animation}
      </p>
    </main>
  )
}
