import { useState } from 'react'
import './App.css'
import { LandingPage } from './pages/LandingPage'
import { ResultPage } from './pages/ResultPage'
import { ResumePage } from './pages/ResumePage'

export type AppPage = 'landing' | 'resume' | 'result'

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing')

  if (currentPage === 'resume') {
    return <ResumePage onComplete={() => setCurrentPage('result')} />
  }

  if (currentPage === 'result') {
    return <ResultPage onRestart={() => setCurrentPage('landing')} />
  }

  return <LandingPage onStart={() => setCurrentPage('resume')} />
}

export default App
