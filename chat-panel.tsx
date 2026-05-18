"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello. I'm Leitmotif, your study companion. I can help you analyze documents, find connections between ideas, and clarify complex concepts. What would you like to explore?",
  },
]

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const responses = [
        "That's an interesting angle. The paper's core insight is that self-attention can replace recurrence entirely, which was considered radical at the time. The key mechanism allowing this is multi-head attention, which lets the model attend to different representation subspaces simultaneously.",
        "The Transformer architecture introduced here became the foundation for virtually all modern language models. The encoder-decoder structure with stacked self-attention layers proved remarkably scalable, enabling models like BERT, GPT, and their successors.",
        "Looking at this from a cognitive science perspective, the attention mechanism mirrors how human selective attention works - we also focus on different aspects of information in parallel, integrating them into a coherent understanding.",
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <aside className="grain-overlay grain-heavy flex h-full flex-col bg-card">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <Sparkles className="size-3.5 text-primary/70" />
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase grain-text">
          Leitmotif v1
        </span>
      </div>

      <ScrollArea className="flex-1 overflow-auto relative z-10">
        <div ref={scrollRef} className="flex flex-col gap-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col gap-1",
                message.role === "user" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed grain-text",
                  message.role === "user"
                    ? "bg-accent text-foreground border border-border"
                    : "text-foreground/80"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start">
              <div className="flex items-center gap-1 px-3.5 py-2.5 text-muted-foreground">
                <span className="inline-block size-1.5 rounded-full bg-muted-foreground/50 animate-pulse" />
                <span
                  className="inline-block size-1.5 rounded-full bg-muted-foreground/50 animate-pulse"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="inline-block size-1.5 rounded-full bg-muted-foreground/50 animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="relative z-10 border-t border-border p-3">
          <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your documents..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-foreground/90 placeholder:text-muted-foreground/60 outline-none grain-text leading-relaxed"
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleSend}
            disabled={!input.trim()}
            className="shrink-0 text-muted-foreground hover:text-primary disabled:opacity-30"
          >
            <Send className="size-3.5" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground/40 grain-text">
          Leitmotif can make mistakes. Verify important information.
        </p>
      </div>
    </aside>
  )
}
