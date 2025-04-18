"use client"

import { useParams } from "next/navigation"
import { getSnippetById } from "@/lib/data"
import { CodeDisplay } from "@/components/code-display"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Share2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function SnippetPage() {
  const { id } = useParams()
  const snippet = getSnippetById(id as string)
  const [copied, setCopied] = useState(false)

  if (!snippet) {
    return (
      <div className="container py-8 md:py-12">
        <h1 className="text-3xl font-bold">Snippet not found</h1>
        <Button asChild className="mt-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to snippets
          </Link>
        </Button>
      </div>
    )
  }

  // Enhanced color palette for different languages
  const gradientMap: Record<string, string> = {
    "C++": "from-rose-500/20 to-pink-600/20 dark:from-rose-600/10 dark:to-pink-700/10",
    tsx: "from-purple-500/20 to-indigo-600/20 dark:from-purple-600/10 dark:to-indigo-700/10",
    typescript: "from-cyan-500/20 to-blue-600/20 dark:from-cyan-600/10 dark:to-blue-700/10",
    jsx: "from-amber-500/20 to-red-600/20 dark:from-amber-600/10 dark:to-red-700/10",
    css: "from-emerald-500/20 to-green-600/20 dark:from-emerald-600/10 dark:to-green-700/10",
    python: "from-yellow-500/20 to-orange-600/20 dark:from-yellow-600/10 dark:to-orange-700/10",
    javascript: "from-fuchsia-500/20 to-purple-600/20 dark:from-fuchsia-600/10 dark:to-purple-700/10",
    html: "from-red-500/20 to-orange-600/20 dark:from-red-600/10 dark:to-orange-700/10",
    json: "from-teal-500/20 to-emerald-600/20 dark:from-teal-600/10 dark:to-emerald-700/10",
    bash: "from-gray-500/20 to-slate-600/20 dark:from-gray-600/10 dark:to-slate-700/10",
    markdown: "from-blue-500/20 to-sky-600/20 dark:from-blue-600/10 dark:to-sky-700/10",
    default: "from-violet-500/20 to-fuchsia-600/20 dark:from-violet-600/10 dark:to-fuchsia-700/10",
  }

  const gradientClass = gradientMap[snippet.language] || gradientMap.default

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "The code snippet has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button variant="outline" asChild className="mb-6 relative z-10">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to snippets
        </Link>
      </Button>

      <div className="relative rounded-lg overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}></div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10 p-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{snippet.title}</h1>
            <p className="mt-2 text-muted-foreground">{snippet.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 relative z-10 p-4">
          {snippet.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-8 relative z-10 p-4">
          <CodeDisplay code={snippet.code} language={snippet.language} />
        </div>
      </div>
    </motion.div>
  )
}

