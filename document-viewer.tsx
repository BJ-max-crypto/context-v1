"use client"

import { useRef } from "react"
import { Upload, FileText, ArrowUpFromLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const sampleContent = {
  title: "Attention Is All You Need",
  authors: "Vaswani, Shazeer, Parmar, et al.",
  date: "June 2017",
  body: `The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.

Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU.

On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.

The Transformer follows an encoder-decoder structure using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder. The encoder maps an input sequence of symbol representations to a sequence of continuous representations. Given z, the decoder then generates an output sequence of symbols one element at a time.

Multi-Head Attention allows the model to jointly attend to information from different representation subspaces at different positions. With a single attention head, averaging inhibits this. Instead of performing a single attention function with d-model-dimensional keys, values and queries, we found it beneficial to linearly project the queries, keys and values h times with different, learned linear projections.

The encoder is composed of a stack of N = 6 identical layers. Each layer has two sub-layers. The first is a multi-head self-attention mechanism, and the second is a simple, position-wise fully connected feed-forward network. We employ a residual connection around each of the two sub-layers, followed by layer normalization.`,
}

export function DocumentViewer({
  selectedFile,
  onUpload,
}: {
  selectedFile: string | null
  onUpload: (files: FileList) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files)
    }
  }

  if (!selectedFile) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6 px-8 text-center max-w-sm">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-accent">
            <FileText className="size-7 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg text-foreground/80 grain-text">
              No document selected
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed grain-text">
              Select a file from the library or upload a new document to begin studying.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleUploadClick}
            className="gap-2 rounded-xl border-border bg-accent text-foreground hover:bg-accent/80 hover:text-foreground"
          >
            <Upload className="size-4" />
            Upload Document
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.md,.txt,.docx"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="text-sm text-foreground/80 truncate grain-text">
            {selectedFile}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleUploadClick}
          className="text-muted-foreground hover:text-foreground shrink-0"
        >
          <ArrowUpFromLine className="size-3.5" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.md,.txt,.docx"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <article className="mx-auto max-w-2xl px-8 py-10">
          <header className="mb-8 space-y-3">
            <h1 className="text-2xl font-semibold text-foreground grain-text leading-tight">
              {sampleContent.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground grain-text">
              <span>{sampleContent.authors}</span>
              <span className="text-border">{"/"}</span>
              <span>{sampleContent.date}</span>
            </div>
            <div className="h-px bg-border/60" />
          </header>
          <div className="space-y-5 text-sm leading-relaxed text-foreground/75 grain-text">
            {sampleContent.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>
      </ScrollArea>
    </div>
  )
}
