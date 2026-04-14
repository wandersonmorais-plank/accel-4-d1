"use client"

import { useSettings } from "@/lib/settings-context"
import { useEffect, useState } from "react"

type StepId = "1" | "2" | "3" | "4" | "5"

interface StepCheck {
  id: StepId
  label: string
  done: boolean
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

      const probeFade = document.createElement("div")
      probeFade.className = "animate-fade-in"
      probeFade.style.cssText = "position:absolute;left:-9999px;top:0;pointer-events:none"
      document.body.appendChild(probeFade)
      const fadeAnim = getComputedStyle(probeFade).animationName
      document.body.removeChild(probeFade)

      const probeSlide = document.createElement("div")
      probeSlide.className = "animate-slide-up"
      probeSlide.style.cssText = "position:absolute;left:-9999px;top:0;pointer-events:none"
      document.body.appendChild(probeSlide)
      const slideAnim = getComputedStyle(probeSlide).animationName
      document.body.removeChild(probeSlide)

      const fadeOk =
        fadeAnim === "fadeIn" || fadeAnim.includes("fadeIn") || fadeAnim.split(", ").some((s) => s.includes("fadeIn"))
      const slideOk =
        slideAnim === "slideUp" ||
        slideAnim.includes("slideUp") ||
        slideAnim.split(", ").some((s) => s.includes("slideUp"))

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
          done: fadeOk && slideOk,
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

export default function DashboardPage() {
  const { theme, title, description, font, animation, setTheme, setTitle, setDescription, setFont, setAnimation } =
    useSettings()

  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    setAnimKey((k) => k + 1)
  }, [animation, title, description])

  const animClass =
    {
      "fade-in": "animate-fade-in",
      "slide-up": "animate-slide-up",
    }[animation]

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
              <span className="text-sm font-medium">Theme</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`rounded-md border px-3 py-2 text-sm ${
                    theme === "light" ? "border-primary bg-secondary" : "border-border bg-background"
                  }`}
                >
                  light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`rounded-md border px-3 py-2 text-sm ${
                    theme === "dark" ? "border-primary bg-secondary" : "border-border bg-background"
                  }`}
                >
                  dark
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="dash-title" className="text-sm font-medium">
                Title
              </label>
              <input
                id="dash-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dash-desc" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="dash-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Font</legend>
              <div className="flex flex-col gap-2">
                {(
                  [
                    { value: "inter" as const, label: "Inter" },
                    { value: "playfair" as const, label: "Playfair Display" },
                    { value: "space-grotesk" as const, label: "Space Grotesk" },
                  ] as const
                ).map((opt) => (
                  <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="font"
                      value={opt.value}
                      checked={font === opt.value}
                      onChange={() => setFont(opt.value)}
                      className="h-4 w-4 accent-primary"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <span className="text-sm font-medium">Animation</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAnimation("fade-in")}
                  className={`rounded-md border px-3 py-2 text-sm ${
                    animation === "fade-in" ? "border-primary bg-secondary" : "border-border bg-background"
                  }`}
                >
                  fade-in
                </button>
                <button
                  type="button"
                  onClick={() => setAnimation("slide-up")}
                  className={`rounded-md border px-3 py-2 text-sm ${
                    animation === "slide-up" ? "border-primary bg-secondary" : "border-border bg-background"
                  }`}
                >
                  slide-up
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <ImplementationProgress font={font} />

          <div>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Live preview</h2>
            <div
              key={animKey}
              className={`${animClass} rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm`}
            >
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="mt-2 text-muted-foreground">{description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>Font: {font}</span>
                <span aria-hidden>·</span>
                <span>Theme: {theme}</span>
                <span aria-hidden>·</span>
                <span>Animation: {animation}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAnimKey((k) => k + 1)}
              className="mt-4 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
            >
              Replay animation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
