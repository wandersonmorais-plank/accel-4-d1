import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ButtonHTMLAttributes } from "react"

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        toggle: "px-3 py-2 font-normal",
        secondary: "border-border bg-secondary px-4 py-2 font-medium text-secondary-foreground hover:bg-secondary/80",
      },
      pressed: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "toggle",
        pressed: true,
        class: "border-primary bg-secondary",
      },
      {
        variant: "toggle",
        pressed: false,
        class: "border-border bg-background hover:bg-accent hover:text-accent-foreground",
      },
    ],
    defaultVariants: {
      variant: "toggle",
      pressed: false,
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** When `variant` is `toggle`, reflects selected / active visual state. */
    pressed?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "toggle", pressed = false, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, pressed: variant === "toggle" ? pressed : undefined }), className)}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"
