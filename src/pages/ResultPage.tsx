import { PageShell } from '../components/layout/PageShell'
import { FinalDecision } from '../components/result/FinalDecision'
import { appContent } from '../data/resumeSections'

interface ResultPageProps {
  onRestart: () => void
}

export function ResultPage({ onRestart }: ResultPageProps) {
  const { pageLabels, result } = appContent

  return (
    <PageShell title={pageLabels.result}>
      <FinalDecision title={result.title} description={result.description} />
      <div className="page-actions">
        <button className="primary-button" type="button" onClick={onRestart}>
          {result.restartButton}
        </button>
      </div>
    </PageShell>
  )
}
