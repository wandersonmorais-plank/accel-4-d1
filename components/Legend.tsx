import { cn } from "@/lib/utils"
import { forwardRef, type HTMLAttributes } from "react"

export type LegendProps = HTMLAttributes<HTMLLegendElement>

export const Legend = forwardRef<HTMLLegendElement, LegendProps>(({ className, ...props }, ref) => (
  <legend ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
))

Legend.displayName = "Legend"
