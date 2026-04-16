"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useBuilderContext } from "@/lib/builder-context"
import { cn } from "@/lib/utils"
import SortableElement from "./SortableElement"

export default function CanvasPanel() {
  const { elements, selectElement } = useBuilderContext()
  const { setNodeRef, isOver } = useDroppable({
    id: "builder-canvas",
    data: { type: "canvas" },
  })

  const ids = elements.map((el) => el.id)

  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-muted/30" aria-label="Canvas">
      <header
        className="shrink-0 border-b border-border bg-background px-3 py-2"
        aria-label="Canvas toolbar slot"
      >
        {/* Reserved for BuilderToolbar (later task) */}
      </header>
      <div
        ref={setNodeRef}
        className={cn(
          "relative min-h-0 flex-1 overflow-y-auto p-4",
          isOver && "bg-primary/5",
        )}
        onClick={(e) => {
          const target = e.target as HTMLElement | null
          if (!target) return
          if (!target.closest("[data-canvas-element]")) selectElement(null)
        }}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="flex min-h-full min-w-0 flex-col gap-3">
            {elements.map((el) => (
              <SortableElement key={el.id} element={el} />
            ))}
          </div>
        </SortableContext>
      </div>
    </main>
  )
}
