import { PageShell } from '../components/layout/PageShell'
import { ResumeSection } from '../components/resume/ResumeSection'
import { ResumeSidebar } from '../components/resume/ResumeSidebar'
import { appContent, resumeSections } from '../data/resumeSections'
import { useActiveSection } from '../hooks/useActiveSection'

interface ResumePageProps {
  onComplete: () => void
}

export function ResumePage({ onComplete: _onComplete }: ResumePageProps) {
  const { resume, pageLabels } = appContent
  const { activeSectionId, setActiveSectionId } = useActiveSection(
    resumeSections[0].id,
  )

  return (
    <PageShell title={pageLabels.resume}>
      <div className="resume-layout">
        <div className="resume-content">
          {resumeSections.map((section) => (
            <ResumeSection key={section.id} section={section} />
          ))}
        </div>
        <ResumeSidebar
          title={resume.sidebarTitle}
          sections={resumeSections}
          activeSectionId={activeSectionId}
          onSelect={setActiveSectionId}
        />
      </div>
    </PageShell>
  )
}
