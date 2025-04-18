"use client"

import { Search } from "@/components/search"
import { SnippetCard } from "@/components/snippet-card"
import { getSnippets } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function Home() {
  const snippets = getSnippets()
  const tags = [...new Set(snippets.flatMap((snippet) => snippet.tags))].sort()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Code Snippets
          </h1>
          <p className="mt-2 text-muted-foreground">A collection of useful code snippets for your reference.</p>
        </div>
        <Search />
      </div>

      <Tabs defaultValue="all" className="mt-8">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          {tags.map((tag) => (
            <TabsTrigger key={tag} value={tag}>
              {tag}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="mt-0">
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {snippets.map((snippet) => (
              <motion.div key={snippet.id} variants={item}>
                <SnippetCard snippet={snippet} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        {tags.map((tag) => (
          <TabsContent key={tag} value={tag} className="mt-0">
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {snippets
                .filter((snippet) => snippet.tags.includes(tag))
                .map((snippet) => (
                  <motion.div key={snippet.id} variants={item}>
                    <SnippetCard snippet={snippet} />
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

