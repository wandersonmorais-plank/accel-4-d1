"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Legend } from "@/components/Legend"
import { Radio } from "@/components/Radio"
import { SectionLabel } from "@/components/SectionLabel"
import { Textarea } from "@/components/Textarea"
import type { AnimationChoice } from "@/lib/settings-context"
import { useSettings } from "@/lib/settings-context"
import { useCallback, useEffect, useState } from "react"

type StepId = "1" | "2" | "3" | "4" | "5"

interface StepCheck {
  id: StepId
  label: string
  done: boolean
}

function animationNameMatches(computed: string, needle: string) {
  if (computed === needle) return true
  if (computed.includes(needle)) return true
  return computed.split(", ").some((s) => s.includes(needle))
}

function probeAnimationUtility(className: string) {
  const el = document.createElement("div")
  el.className = className
  el.style.cssText = "position:absolute;left:-9999px;top:0;pointer-events:none"
  document.body.appendChild(el)
  const name = getComputedStyle(el).animationName
  document.body.removeChild(el)
  return name
}

function useImplementationSteps(font: string): StepCheck[] {
  const [steps, setSteps] = useState<StepCheck[]>([
    { id: "1", label: "Step 1 — Settings context (`lib/settings-context.tsx`)", done: false },
    { id: "2", label: "Step 2 — Providers + `GlobalSettingsApplier` (`app/providers.tsx`)", done: false },
    { id: "3", label: "Step 3 — Fonts on `<html>` (`app/layout.tsx`)", done: false },
    { id: "4", label: "Step 4 — Body font + animations (`app/globals.css`)", done: false },
    { id: "5", label: "Step 5 — This dashboard page (`app/dashboard/page.tsx`)", done: false },
  ])

  useEffect(() => {
    let cancelled = false

    const run = () => {
      const root = document.documentElement
      const fontInterVar = getComputedStyle(root).getPropertyValue("--font-inter").trim()
      const fontActiveInline = root.style.getPropertyValue("--font-active").trim()

      const animationChecks = [
        { cls: "animate-fade-in", needle: "fadeIn" },
        { cls: "animate-slide-up", needle: "slideUp" },
        { cls: "animate-slide-down", needle: "slideDown" },
        { cls: "animate-scale-in", needle: "scaleIn" },
        { cls: "animate-blur-in", needle: "blurIn" },
      ] as const

      const animationsOk = animationChecks.every(({ cls, needle }) =>
        animationNameMatches(probeAnimationUtility(cls), needle),
      )

      const path = typeof window !== "undefined" ? window.location.pathname : ""

      if (cancelled) return

      setSteps([
        {
          id: "1",
          label: "Step 1 — Settings context (`lib/settings-context.tsx`)",
          done: true,
        },
        {
          id: "2",
          label: "Step 2 — Providers + `GlobalSettingsApplier` (`app/providers.tsx`)",
          done: fontActiveInline.length > 0,
        },
        {
          id: "3",
          label: "Step 3 — Fonts on `<html>` (`app/layout.tsx`)",
          done: fontInterVar.length > 0,
        },
        {
          id: "4",
          label: "Step 4 — Body font + animations (`app/globals.css`)",
          done: animationsOk,
        },
        {
          id: "5",
          label: "Step 5 — This dashboard page (`app/dashboard/page.tsx`)",
          done: path === "/dashboard",
        },
      ])
    }

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(run)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(id)
    }
  }, [font])

  return steps
}

function ImplementationProgress({ font }: { font: string }) {
  const steps = useImplementationSteps(font)
  const doneCount = steps.filter((s) => s.done).length

  return (
    <section className="rounded-xl border border-border bg-card p-4 text-card-foreground">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Implementation progress</h2>
        <span className="text-xs text-muted-foreground">
          {doneCount}/{steps.length}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Checked at runtime in the browser (no storage). Reload resets settings; this list re-runs on mount.
      </p>
      <ul className="mt-3 space-y-2">
        {steps.map((s) => (
          <li key={s.id} className="flex gap-2 text-sm">
            <span className="shrink-0" aria-hidden>
              {s.done ? "✓" : "○"}
            </span>
            <span className={s.done ? "text-foreground" : "text-muted-foreground"}>{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

const ANIMATION_CLASS: Record<AnimationChoice, string> = {
  "fade-in": "animate-fade-in",
  "slide-up": "animate-slide-up",
  "slide-down": "animate-slide-down",
  "scale-in": "animate-scale-in",
  "blur-in": "animate-blur-in",
}

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

  const animClass = ANIMATION_CLASS[animation]

  return (
    <div className="min-h-dvh bg-background p-6 text-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <header>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Runtime-only settings (lost on reload).</p>
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

        <div className="space-y-6">
          <ImplementationProgress font={font} />

          <div>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Live preview</h2>
            <div className="rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm">
              <div key={animKey}>
                <h1 className={`text-3xl font-bold ${animClass} motion-reduce:animate-none`}>{title}</h1>
                <p className={`mt-2 text-muted-foreground ${animClass} motion-reduce:animate-none`}>
                  {description}
                </p>
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
    </div>
  )
}
