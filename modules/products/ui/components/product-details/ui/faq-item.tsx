import { memo } from "react"

interface FaqItemProps {
  question: string
  answer: string
}

function FaqItemComponent({ question, answer }: FaqItemProps) {
  return (
    <div className="p-4 border border-border rounded-lg">
      <h3 className="font-semibold text-sm mb-2">{question}</h3>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </div>
  )
}

export const FaqItem = memo(FaqItemComponent)
