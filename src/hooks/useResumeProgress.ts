import { useState } from 'react'

export function useResumeProgress() {
  const [completedSectionIds, setCompletedSectionIds] = useState<Set<string>>(
    () => new Set(),
  )

  const setSectionCompleted = (sectionId: string, completed: boolean) => {
    setCompletedSectionIds((current) => {
      const next = new Set(current)
      if (completed) {
        next.add(sectionId)
      } else {
        next.delete(sectionId)
      }
      return next
    })
  }

  return { completedSectionIds, setSectionCompleted }
}
