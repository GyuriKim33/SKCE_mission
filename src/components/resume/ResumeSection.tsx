import type { ResumeSectionData } from '../../data/resumeSections'

interface ResumeSectionProps {
  section: ResumeSectionData
}

export function ResumeSection({ section }: ResumeSectionProps) {
  return (
    <section className="resume-section" id={section.id}>
      <h2>{section.title}</h2>
      <p>{section.body}</p>
    </section>
  )
}
