import { StickyMessageBar } from '../components/layout/StickyMessageBar'
import { PageShell } from '../components/layout/PageShell'
import { EvaluationChecklist } from '../components/resume/EvaluationChecklist'
import { ResumeSection } from '../components/resume/ResumeSection'
import { ResumeSidebar } from '../components/resume/ResumeSidebar'
import { appContent, resumeSections } from '../data/resumeSections'
import { stickyMessages } from '../data/stickyMessages'
import { useActiveSection } from '../hooks/useActiveSection'
import { useResumeProgress } from '../hooks/useResumeProgress'

interface ResumePageProps {
  onComplete: () => void
}

export function ResumePage({ onComplete }: ResumePageProps) {
  const { resume, pageLabels } = appContent
  const { activeSectionId, setActiveSectionId } = useActiveSection(
    resumeSections[0].id,
  )
  const { completedSectionIds, setSectionCompleted } = useResumeProgress()
  const activeMessage =
    stickyMessages.find((message) => message.sectionId === activeSectionId) ??
    stickyMessages[0]

  return (
    <PageShell title={pageLabels.resume}>
      <StickyMessageBar message={activeMessage.text} />
      <div className="resume-layout">
        <ResumeSidebar
          title={resume.sidebarTitle}
          sections={resumeSections}
          activeSectionId={activeSectionId}
          onSelect={setActiveSectionId}
        />
        <div className="resume-content">
          {resumeSections.map((section) => (
            <ResumeSection key={section.id} section={section} />
          ))}
          <EvaluationChecklist
            title={resume.checklistTitle}
            sections={resumeSections}
            completedSectionIds={completedSectionIds}
            onChange={setSectionCompleted}
          />
          <div className="page-actions">
            <button className="primary-button" type="button" onClick={onComplete}>
              {resume.completeButton}
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
