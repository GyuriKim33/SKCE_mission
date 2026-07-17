export interface StickyMessage {
  sectionId: string
  text: string
}

export const stickyMessages: readonly StickyMessage[] = [
  { sectionId: 'motivation', text: '지원 동기를 검토하고 있습니다.' },
  { sectionId: 'experience', text: '주요 경험을 검토하고 있습니다.' },
  { sectionId: 'future', text: '입사 후 포부를 검토하고 있습니다.' },
]
