"use client"

import { useEffect, useRef } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-json"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-markdown"
// Add C++ language support
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import { Card } from "@/components/ui/card"

interface CodeDisplayProps {
  code: string
  language: string
}

export function CodeDisplay({ code, language }: CodeDisplayProps) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  // Map 'C++' to 'cpp' for Prism
  const normalizedLanguage = language === "C++" ? "cpp" : language.toLowerCase()

  return (
    <Card className="overflow-hidden">
      <pre className="code-highlight">
        <code ref={codeRef} className={`language-${normalizedLanguage}`}>
          {code}
        </code>
      </pre>
    </Card>
  )
}

