import { cn } from "@/lib/utils"
import { forwardRef, type HTMLAttributes } from "react"

export type SectionLabelProps = HTMLAttributes<HTMLSpanElement>

export const SectionLabel = forwardRef<HTMLSpanElement, SectionLabelProps>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
))

SectionLabel.displayName = "SectionLabel"
