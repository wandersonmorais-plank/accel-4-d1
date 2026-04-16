"use client"

import { cn } from "@/lib/utils"

export default function PropertyPanel({ className }: { className?: string }) {
  return (
    <aside
      className={cn("flex h-full w-[300px] flex-col border-l bg-background", className)}
      aria-label="Property panel"
    />
  )
}
