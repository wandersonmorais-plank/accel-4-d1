import { cn } from "@/lib/utils"
import { forwardRef, type InputHTMLAttributes } from "react"

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="radio"
    className={cn("h-4 w-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50", className)}
    {...props}
  />
))

Radio.displayName = "Radio"
