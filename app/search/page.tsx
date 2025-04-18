"use client"

import { useSearchParams } from "next/navigation"
import { SnippetCard } from "@/components/snippet-card"
import { searchSnippets } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const results = searchSnippets(query)

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-4">
        <Button variant="outline" asChild className="w-fit">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to snippets
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Search results for: <span className="text-primary">{query}</span>
        </h1>
        <p className="text-muted-foreground">
          Found {results.length} {results.length === 1 ? "result" : "results"}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-medium">No results found</h2>
          <p className="mt-2 text-muted-foreground">Try searching for something else or browse all snippets.</p>
          <Button asChild className="mt-4">
            <Link href="/">View all snippets</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

