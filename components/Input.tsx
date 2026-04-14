import { cn } from "@/lib/utils"
import { forwardRef, type InputHTMLAttributes } from "react"

const inputClassName =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => (
  <input ref={ref} type={type} className={cn(inputClassName, className)} {...props} />
))

Input.displayName = "Input"
