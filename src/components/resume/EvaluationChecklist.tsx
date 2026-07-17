import type { ResumeSectionData } from '../../data/resumeSections'

interface EvaluationChecklistProps {
  title: string
  sections: readonly ResumeSectionData[]
  completedSectionIds: ReadonlySet<string>
  onChange: (sectionId: string, completed: boolean) => void
}

export function EvaluationChecklist({
  title,
  sections,
  completedSectionIds,
  onChange,
}: EvaluationChecklistProps) {
  return (
    <section className="evaluation-checklist">
      <h2>{title}</h2>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <label>
              <input
                type="checkbox"
                checked={completedSectionIds.has(section.id)}
                onChange={(event) => onChange(section.id, event.target.checked)}
              />
              {section.title}
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
