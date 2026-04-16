"use client"

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useState } from "react"
import { useBuilderContext } from "@/lib/builder-context"
import type { ElementType } from "@/lib/builder-types"
import { cn } from "@/lib/utils"
import CanvasPanel from "./CanvasPanel"
import ElementSidebar, { type SidebarDragData } from "./ElementSidebar"
import PropertyPanel from "./PropertyPanel"

const OVERLAY_LABELS: Record<ElementType, string> = {
  text: "Text",
  button: "Button",
  carousel: "Carousel",
}

function isSidebarDragData(value: unknown): value is SidebarDragData {
  if (typeof value !== "object" || value === null) return false
  const v = value as { source?: unknown; elementType?: unknown }
  return (
    v.source === "sidebar" &&
    (v.elementType === "text" || v.elementType === "button" || v.elementType === "carousel")
  )
}

function BuilderLayout() {
  const { isPreview } = useBuilderContext()
  const [activeSidebarType, setActiveSidebarType] = useState<ElementType | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        if (isSidebarDragData(event.active.data.current)) {
          setActiveSidebarType(event.active.data.current.elementType)
        }
      }}
      onDragEnd={() => setActiveSidebarType(null)}
      onDragCancel={() => setActiveSidebarType(null)}
    >
      <div className="flex h-screen w-full overflow-hidden">
        <ElementSidebar className={cn(isPreview && "hidden")} />
        <CanvasPanel />
        <PropertyPanel className={cn(isPreview && "hidden")} />
      </div>
      <DragOverlay dropAnimation={null}>
        {activeSidebarType ? (
          <div className="flex w-56 flex-col gap-1 rounded-md border border-border bg-card p-3 text-left text-card-foreground shadow-lg">
            <div className="text-sm font-medium">{OVERLAY_LABELS[activeSidebarType]}</div>
            <div className="text-xs text-muted-foreground">Drop on canvas to place</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default function BuilderView() {
  return <BuilderLayout />
}
