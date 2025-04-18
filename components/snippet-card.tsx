"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Snippet } from "@/lib/types"
import Link from "next/link"
import { motion } from "framer-motion"
import { CodeIcon } from "lucide-react"

interface SnippetCardProps {
  snippet: Snippet
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  // Map languages to gradient colors
  const gradientMap: Record<string, string> = {
    tsx: "from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600",
    typescript: "from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600",
    jsx: "from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600",
    css: "from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600",
    default: "from-violet-500 to-fuchsia-500 dark:from-violet-600 dark:to-fuchsia-600",
  }

  const gradientClass = gradientMap[snippet.language] || gradientMap.default

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
      <Link href={`/snippets/${snippet.id}`} className="h-full block">
        <Card className="h-full overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-10 hover:opacity-20 transition-opacity duration-300`}
          ></div>

          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${gradientClass}"></div>

          <CardHeader className="pb-3 relative">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                {snippet.language}
              </Badge>
              <CodeIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="line-clamp-1 text-xl">{snippet.title}</CardTitle>
          </CardHeader>

          <CardContent className="relative">
            <p className="line-clamp-2 text-sm text-muted-foreground">{snippet.description}</p>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-1 border-t pt-3 relative">
            {snippet.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
            {snippet.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                +{snippet.tags.length - 3}
              </Badge>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

