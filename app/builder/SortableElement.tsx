"use client"

import { useSortable } from "@dnd-kit/sortable"
import { GripVertical } from "lucide-react"
import { useBuilderContext } from "@/lib/builder-context"
import type { CanvasElement } from "@/lib/builder-types"
import { cn } from "@/lib/utils"

function elementSummary(element: CanvasElement): string {
  if (element.type === "text") {
    const text = element.props.content
    return text.length > 80 ? `${text.slice(0, 80)}…` : text
  }
  if (element.type === "button") return element.props.label
  return `${element.props.images.length} image${element.props.images.length === 1 ? "" : "s"}`
}

export default function SortableElement({ element }: { element: CanvasElement }) {
  const { selectElement, selectedId } = useBuilderContext()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
  })

  const selected = selectedId === element.id

  const style = {
    transform:
      transform == null
        ? undefined
        : `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`,
    transition,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-canvas-element
      className={cn("touch-none", isDragging && "opacity-80")}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation()
          selectElement(element.id)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            selectElement(element.id)
          }
        }}
        className={cn(
          "flex min-h-[4rem] cursor-pointer items-stretch gap-2 rounded-md border border-border bg-card p-2 text-left outline-none",
          "hover:bg-accent/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          selected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        )}
      >
        <button
          type="button"
          className="mt-0.5 shrink-0 cursor-grab touch-none rounded border border-transparent p-1 text-muted-foreground hover:bg-muted hover:text-foreground active:cursor-grabbing"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-4 w-4" aria-hidden />
        </button>
        <div className="min-w-0 flex-1 self-center">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{element.type}</div>
          <div className="truncate text-sm text-foreground">{elementSummary(element)}</div>
        </div>
      </div>
    </div>
  )
}
