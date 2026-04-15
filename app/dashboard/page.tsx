"use client"

import { Button } from "@/components/Button"
import { NavLinkButton } from "@/components/NavLinkButton"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Legend } from "@/components/Legend"
import { Radio } from "@/components/Radio"
import { SectionLabel } from "@/components/SectionLabel"
import { Textarea } from "@/components/Textarea"
import { PREVIEW_ANIMATION_CLASS } from "@/lib/preview-animation-classes"
import type { AnimationChoice } from "@/lib/settings-context"
import { useSettings } from "@/lib/settings-context"
import { useCallback, useEffect, useState } from "react"

const ANIMATION_OPTIONS: { value: AnimationChoice; label: string }[] = [
  { value: "fade-in", label: "Fade in" },
  { value: "slide-up", label: "Slide up" },
  { value: "slide-down", label: "Slide down" },
  { value: "scale-in", label: "Scale in" },
  { value: "blur-in", label: "Blur in" },
]

export default function DashboardPage() {
  const { theme, title, description, font, animation, setTheme, setTitle, setDescription, setFont, setAnimation } =
    useSettings()

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
    <div className="min-h-dvh bg-background p-6 text-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">Runtime-only settings (lost on reload).</p>
            </div>
            <NavLinkButton href="/">Home</NavLinkButton>
          </header>

          <section className="space-y-6 rounded-xl border border-border bg-card p-5 text-card-foreground">
            <div className="space-y-2">
              <SectionLabel>Theme</SectionLabel>
              <div className="flex gap-2">
                <Button variant="toggle" pressed={theme === "light"} onClick={() => setTheme("light")}>
                  light
                </Button>
                <Button variant="toggle" pressed={theme === "dark"} onClick={() => setTheme("dark")}>
                  dark
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dash-title">Title</Label>
              <Input id="dash-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dash-desc">Description</Label>
              <Textarea id="dash-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
            </div>

            <fieldset className="space-y-2">
              <Legend>Font</Legend>
              <div className="flex flex-col gap-2">
                {(
                  [
                    { value: "inter" as const, label: "Inter" },
                    { value: "playfair" as const, label: "Playfair Display" },
                    { value: "space-grotesk" as const, label: "Space Grotesk" },
                  ] as const
                ).map((opt) => (
                  <Label key={opt.value} variant="inline" htmlFor={`font-${opt.value}`}>
                    <Radio
                      id={`font-${opt.value}`}
                      name="font"
                      value={opt.value}
                      checked={font === opt.value}
                      onChange={() => setFont(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </Label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <SectionLabel>Animation</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {ANIMATION_OPTIONS.map((opt) => (
                  <Button
                    key={opt.value}
                    variant="toggle"
                    pressed={animation === opt.value}
                    onClick={() => setAnimation(opt.value)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Live preview</h2>
          <div className="rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm">
            <div key={animKey}>
              <h1 className={`text-3xl font-bold ${animClass} motion-reduce:animate-none`}>{title}</h1>
              <p className={`mt-2 text-muted-foreground ${animClass} motion-reduce:animate-none`}>{description}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span>Font: {font}</span>
              <span aria-hidden>·</span>
              <span>Theme: {theme}</span>
              <span aria-hidden>·</span>
              <span>Animation: {animation}</span>
            </div>
          </div>
          <Button variant="secondary" className="mt-4" onClick={bumpPreview}>
            Replay animation
          </Button>
        </div>
      </div>
    </div>
  )
}
