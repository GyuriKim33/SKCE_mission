import type { ReactNode } from 'react'
import { Header } from './Header'

interface PageShellProps {
  title: string
  children: ReactNode
}

export function PageShell({ title, children }: PageShellProps) {
  return (
    <div className="page-shell">
      <Header pageTitle={title} />
      <main className="page-content">{children}</main>
    </div>
  )
}
