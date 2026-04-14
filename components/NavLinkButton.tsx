"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import type { ComponentProps } from "react"
import { buttonVariants } from "./Button"

export type NavLinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string
}

/** Client-side navigation with `Button` secondary styling (keeps runtime settings in memory). */
export function NavLinkButton({ className, ...props }: NavLinkButtonProps) {
  return <Link className={cn(buttonVariants({ variant: "secondary" }), className)} {...props} />
}
