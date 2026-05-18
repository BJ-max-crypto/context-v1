"use client"

import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  FolderOpen,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type FileNode = {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
}

const fileTree: FileNode[] = [
  {
    name: "Research Papers",
    type: "folder",
    children: [
      {
        name: "Machine Learning",
        type: "folder",
        children: [
          { name: "Attention Is All You Need.pdf", type: "file" },
          { name: "BERT Pre-training.pdf", type: "file" },
          { name: "GPT-4 Technical Report.pdf", type: "file" },
        ],
      },
      {
        name: "Cognitive Science",
        type: "folder",
        children: [
          { name: "Memory Consolidation.pdf", type: "file" },
          { name: "Dual Process Theory.pdf", type: "file" },
        ],
      },
    ],
  },
  {
    name: "Lecture Notes",
    type: "folder",
    children: [
      { name: "Week 1 - Introduction.md", type: "file" },
      { name: "Week 2 - Foundations.md", type: "file" },
      { name: "Week 3 - Advanced Topics.md", type: "file" },
      { name: "Week 4 - Applications.md", type: "file" },
    ],
  },
  {
    name: "Reading List",
    type: "folder",
    children: [
      { name: "Thinking, Fast and Slow.pdf", type: "file" },
      { name: "The Structure of Scientific Revolutions.pdf", type: "file" },
    ],
  },
  { name: "Notes.md", type: "file" },
  { name: "Bibliography.bib", type: "file" },
]

function TreeNode({
  node,
  depth = 0,
  selectedFile,
  onSelectFile,
}: {
  node: FileNode
  depth?: number
  selectedFile: string | null
  onSelectFile: (name: string) => void
}) {
  const [isOpen, setIsOpen] = useState(depth === 0)

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-accent",
            "grain-text"
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isOpen ? (
            <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          {isOpen ? (
            <FolderOpen className="size-3.5 shrink-0 text-primary/70" />
          ) : (
            <Folder className="size-3.5 shrink-0 text-primary/70" />
          )}
          <span className="truncate text-foreground/90">{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map((child) => (
              <TreeNode
                key={child.name}
                node={child}
                depth={depth + 1}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => onSelectFile(node.name)}
      className={cn(
        "flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-accent",
        "grain-text",
        selectedFile === node.name && "bg-accent text-accent-foreground"
      )}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      <span className="size-3.5 shrink-0" />
      <FileText className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="truncate text-foreground/80">{node.name}</span>
    </button>
  )
}

export function FolderSidebar({
  selectedFile,
  onSelectFile,
}: {
  selectedFile: string | null
  onSelectFile: (name: string) => void
}) {
  return (
    <aside className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="size-2 rounded-full bg-primary/60" />
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase grain-text">
          Library
        </span>
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <div className="p-2">
          {fileTree.map((node) => (
            <TreeNode
              key={node.name}
              node={node}
              selectedFile={selectedFile}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
