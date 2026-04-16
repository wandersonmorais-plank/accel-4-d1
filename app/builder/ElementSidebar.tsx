"use client"

import { cn } from "@/lib/utils"

export default function ElementSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn("flex h-full w-60 flex-col border-r bg-background", className)}
      aria-label="Element sidebar"
    />
  )
}
