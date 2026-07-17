interface FinalDecisionProps {
  title: string
  description: string
}

export function FinalDecision({ title, description }: FinalDecisionProps) {
  return (
    <section className="final-decision">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}
