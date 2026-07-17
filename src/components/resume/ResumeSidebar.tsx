import type { ResumeSectionData } from '../../data/resumeSections'

interface ResumeSidebarProps {
  title: string
  sections: readonly ResumeSectionData[]
  activeSectionId: string
  onSelect: (sectionId: string) => void
}

export function ResumeSidebar({
  title,
  sections,
  activeSectionId,
  onSelect,
}: ResumeSidebarProps) {
  return (
    <nav className="resume-sidebar" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              aria-current={activeSectionId === section.id}
              onClick={() => onSelect(section.id)}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
