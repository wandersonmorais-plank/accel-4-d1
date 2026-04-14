import type { AnimationChoice } from "@/lib/settings-context"

export const PREVIEW_ANIMATION_CLASS: Record<AnimationChoice, string> = {
  "fade-in": "animate-fade-in",
  "slide-up": "animate-slide-up",
  "slide-down": "animate-slide-down",
  "scale-in": "animate-scale-in",
  "blur-in": "animate-blur-in",
}
