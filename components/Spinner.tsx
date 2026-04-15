// Spinner — animated loading indicator with size variants
import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const spinnerVariants = cva("animate-spin rounded-full border-2 border-current border-t-transparent", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof spinnerVariants>

export const Spinner = ({ className, size, ...props }: SpinnerProps): JSX.Element => (
  <span role="status" aria-label="Loading" className={cn(spinnerVariants({ size }), className)} {...props} />
)
