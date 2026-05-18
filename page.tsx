"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { FolderSidebar } from "@/components/folder-sidebar"
import { DocumentViewer } from "@/components/document-viewer"
import { ChatPanel } from "@/components/chat-panel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<string | null>(
    "Attention Is All You Need.pdf"
  )
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chatWidth, setChatWidth] = useState(340)
  const isResizing = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleUpload = (files: FileList) => {
    if (files.length > 0) {
      setSelectedFile(files[0].name)
    }
  }

  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isResizing.current = true
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()
      const newWidth = containerRect.right - e.clientX
      setChatWidth(Math.max(280, Math.min(600, newWidth)))
    }

    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex h-screen w-screen overflow-hidden bg-background p-2"
    >
      {/* Collapsible sidebar */}
      <div
        className={cn(
          "shrink-0 transition-all duration-300 ease-in-out overflow-hidden",
          sidebarOpen ? "w-56" : "w-0"
        )}
      >
        <div className="grain-overlay h-full w-56 rounded-xl bg-card border border-border">
          <FolderSidebar
            selectedFile={selectedFile}
            onSelectFile={setSelectedFile}
          />
        </div>
      </div>

      {/* Sidebar toggle + Document viewer */}
      <div className="flex flex-1 min-w-0 flex-col">
        <div className="flex flex-1 min-w-0 min-h-0">
          {/* Toggle button gutter */}
          <div className="flex flex-col items-center pt-2 px-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-muted-foreground hover:text-foreground rounded-lg"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="size-4" />
              ) : (
                <PanelLeftOpen className="size-4" />
              )}
            </Button>
          </div>

          {/* Document viewer */}
          <div className="flex-1 min-w-0 rounded-xl bg-card border border-border overflow-hidden">
            <DocumentViewer selectedFile={selectedFile} onUpload={handleUpload} />
          </div>

          {/* Resize handle */}
          <div
            onMouseDown={startResize}
            className="group flex w-3 shrink-0 cursor-col-resize items-center justify-center"
          >
            <div className="h-8 w-1 rounded-full bg-border transition-colors group-hover:bg-primary/40 group-active:bg-primary/60" />
          </div>

          {/* Chat panel */}
          <div
            className="shrink-0 rounded-xl bg-card border border-border overflow-hidden"
            style={{ width: chatWidth }}
          >
            <ChatPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
