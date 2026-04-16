import type { PaletteKey } from "./builder-types"

/**
 * CSS custom properties used by shadcn-style tokens in `app/globals.css`.
 * Values are either HSL triples (`"h s% l%"`) for color vars or a literal
 * for `--radius` (matches `:root` usage with `hsl(var(--token))`).
 */
export const PALETTE_ROOT_VARS = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--border",
  "--input",
  "--ring",
  "--radius",
] as const

export type PaletteRootVar = (typeof PALETTE_ROOT_VARS)[number]

export type PaletteDefinition = Record<PaletteRootVar, string>

const DEFAULT_PALETTE: PaletteDefinition = {
  "--background": "0 0% 100%",
  "--foreground": "222.2 84% 4.9%",
  "--card": "0 0% 100%",
  "--card-foreground": "222.2 84% 4.9%",
  "--primary": "222.2 47.4% 11.2%",
  "--primary-foreground": "210 40% 98%",
  "--secondary": "210 40% 96.1%",
  "--secondary-foreground": "222.2 47.4% 11.2%",
  "--muted": "210 40% 96.1%",
  "--muted-foreground": "215.4 16.3% 46.9%",
  "--accent": "210 40% 96.1%",
  "--accent-foreground": "222.2 47.4% 11.2%",
  "--border": "214.3 31.8% 91.4%",
  "--input": "214.3 31.8% 91.4%",
  "--ring": "222.2 84% 4.9%",
  "--radius": "0.5rem",
}

const ROSE_PALETTE: PaletteDefinition = {
  "--background": "0 100% 99%",
  "--foreground": "240 10% 3.9%",
  "--card": "0 100% 99%",
  "--card-foreground": "240 10% 3.9%",
  "--primary": "346.8 77.2% 49.8%",
  "--primary-foreground": "355.7 100% 97.3%",
  "--secondary": "326 78% 95%",
  "--secondary-foreground": "240 6% 10%",
  "--muted": "326 78% 95%",
  "--muted-foreground": "240 4% 46%",
  "--accent": "326 78% 95%",
  "--accent-foreground": "240 6% 10%",
  "--border": "326 32% 90%",
  "--input": "326 32% 90%",
  "--ring": "346.8 77.2% 49.8%",
  "--radius": "0.5rem",
}

const VIOLET_PALETTE: PaletteDefinition = {
  "--background": "250 100% 99%",
  "--foreground": "224 71% 4%",
  "--card": "250 100% 99%",
  "--card-foreground": "224 71% 4%",
  "--primary": "262.1 83.3% 57.8%",
  "--primary-foreground": "210 40% 98%",
  "--secondary": "250 60% 96%",
  "--secondary-foreground": "222 47% 11%",
  "--muted": "250 60% 96%",
  "--muted-foreground": "215 16% 47%",
  "--accent": "250 60% 96%",
  "--accent-foreground": "222 47% 11%",
  "--border": "250 35% 90%",
  "--input": "250 35% 90%",
  "--ring": "262.1 83.3% 57.8%",
  "--radius": "0.5rem",
}

const EMERALD_PALETTE: PaletteDefinition = {
  "--background": "152 60% 99%",
  "--foreground": "222 47% 11%",
  "--card": "152 60% 99%",
  "--card-foreground": "222 47% 11%",
  "--primary": "142.1 76.2% 36.3%",
  "--primary-foreground": "355.7 100% 97.3%",
  "--secondary": "152 45% 94%",
  "--secondary-foreground": "222 47% 11%",
  "--muted": "152 45% 94%",
  "--muted-foreground": "215 16% 47%",
  "--accent": "152 45% 94%",
  "--accent-foreground": "222 47% 11%",
  "--border": "152 30% 88%",
  "--input": "152 30% 88%",
  "--ring": "142.1 76.2% 36.3%",
  "--radius": "0.5rem",
}

const AMBER_PALETTE: PaletteDefinition = {
  "--background": "48 100% 98%",
  "--foreground": "26 32% 12%",
  "--card": "48 100% 98%",
  "--card-foreground": "26 32% 12%",
  "--primary": "38 92% 50%",
  "--primary-foreground": "48 96% 12%",
  "--secondary": "48 90% 92%",
  "--secondary-foreground": "26 32% 12%",
  "--muted": "48 90% 92%",
  "--muted-foreground": "26 10% 40%",
  "--accent": "48 90% 92%",
  "--accent-foreground": "26 32% 12%",
  "--border": "48 40% 86%",
  "--input": "48 40% 86%",
  "--ring": "38 92% 50%",
  "--radius": "0.5rem",
}

/** Maps each builder palette to the HSL (or radius) values for root CSS variables. */
export const PALETTES: Record<PaletteKey, PaletteDefinition> = {
  default: DEFAULT_PALETTE,
  rose: ROSE_PALETTE,
  violet: VIOLET_PALETTE,
  emerald: EMERALD_PALETTE,
  amber: AMBER_PALETTE,
}
