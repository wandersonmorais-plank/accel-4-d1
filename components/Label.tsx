import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type LabelHTMLAttributes } from "react"

const labelVariants = cva("text-sm font-medium leading-none", {
  variants: {
    variant: {
      default: "",
      inline: "flex cursor-pointer items-center gap-2 text-sm font-normal",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelVariants>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <label ref={ref} className={cn(labelVariants({ variant }), className)} {...props} />
  ),
)

Label.displayName = "Label"
