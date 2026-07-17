import { useState } from 'react'

export function useActiveSection(initialSectionId: string) {
  const [activeSectionId, setActiveSectionId] = useState(initialSectionId)

  return { activeSectionId, setActiveSectionId }
}
