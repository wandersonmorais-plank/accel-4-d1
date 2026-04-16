"use client"

import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { BuilderProvider, useBuilderContext } from "@/lib/builder-context"
import { cn } from "@/lib/utils"
import CanvasPanel from "./CanvasPanel"
import ElementSidebar from "./ElementSidebar"
import PropertyPanel from "./PropertyPanel"

function BuilderLayout() {
  const { isPreview } = useBuilderContext()
  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext sensors={sensors}>
      <div className="flex h-screen w-full overflow-hidden">
        <ElementSidebar className={cn(isPreview && "hidden")} />
        <CanvasPanel />
        <PropertyPanel className={cn(isPreview && "hidden")} />
      </div>
    </DndContext>
  )
}

export default function BuilderView() {
  return (
    <BuilderProvider>
      <BuilderLayout />
    </BuilderProvider>
  )
}
