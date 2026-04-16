"use client"

import { useDraggable } from "@dnd-kit/core"
import { AlignLeft, ImageIcon, Square } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/Button"
import { useBuilderContext } from "@/lib/builder-context"
import type { ElementType } from "@/lib/builder-types"
import { cn } from "@/lib/utils"

export type SidebarDragData = {
  source: "sidebar"
  elementType: ElementType
}

const ELEMENT_CARDS: {
  type: ElementType
  label: string
  description: string
  icon: LucideIcon
}[] = [
  {
    type: "text",
    label: "Text",
    description: "Headings, paragraphs, and labels for your layout.",
    icon: AlignLeft,
  },
  {
    type: "button",
    label: "Button",
    description: "Call-to-action with label, style, and optional link.",
    icon: Square,
  },
  {
    type: "carousel",
    label: "Carousel",
    description: "Image slideshow with autoplay and timing controls.",
    icon: ImageIcon,
  },
]

function SidebarElementCard({
  type,
  label,
  description,
  icon: Icon,
}: (typeof ELEMENT_CARDS)[number]) {
  const { addElement } = useBuilderContext()
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: { source: "sidebar", elementType: type } satisfies SidebarDragData,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex w-full flex-col items-start gap-2 rounded-md border border-border bg-card p-3 text-left text-card-foreground transition-[box-shadow,opacity]",
        "hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDragging && "z-10 cursor-grabbing opacity-70 shadow-md",
        !isDragging && "cursor-grab",
      )}
      {...listeners}
      {...attributes}
      onClick={() => addElement(type)}
    >
      <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}

export default function ElementSidebar({ className }: { className?: string }) {
  const { clearCanvas } = useBuilderContext()

  return (
    <aside
      className={cn("flex h-full min-h-0 w-60 shrink-0 flex-col border-r bg-background", className)}
      aria-label="Element sidebar"
    >
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-3">
          {ELEMENT_CARDS.map((card) => (
            <SidebarElementCard key={card.type} {...card} />
          ))}
        </div>
      </div>
      <footer className="shrink-0 border-t border-border p-3">
        <Button type="button" variant="secondary" className="w-full" onClick={() => clearCanvas()}>
          Clear canvas
        </Button>
      </footer>
    </aside>
  )
}
