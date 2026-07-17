export interface ResumeSectionData {
  id: string
  title: string
  body: string
}

export const resumeSections = [
  {
    id: 'motivation',
    title: '지원 동기',
    body: '지원 동기 내용이 이곳에 표시됩니다.',
  },
  {
    id: 'experience',
    title: '주요 경험',
    body: '주요 경험 내용이 이곳에 표시됩니다.',
  },
  {
    id: 'future',
    title: '입사 후 포부',
    body: '입사 후 포부 내용이 이곳에 표시됩니다.',
  },
] as const satisfies readonly ResumeSectionData[]

export const appContent = {
  brandName: 'Interactive Application',
  pageLabels: {
    landing: '지원 안내',
    resume: '지원서 검토',
    result: '최종 결과',
  },
  landing: {
    introCopyFirst: '늘 기업의 선택을 기다려온 취준생에게,',
    introCopyPrefix: '이번에는 ',
    introCopyEmphasis: '기업이 먼저 지원합니다.',
    notificationEyebrow: 'NEW APPLICATION',
    notificationTitle: '새로운 지원서가 도착했습니다.',
    notificationTime: '지금',
    closeNotificationLabel: '알림 닫기',
    confirmButton: '지원서 확인하기',
    laterButton: '나중에 보기',
    envelopeLabel: '지원서 봉투',
    sealLabel: 'SK',
    companyLabel: '지원 기업',
    companyName: 'SK hynix',
    positionLabel: '지원 포지션',
    positionName: '당신의 관심기업',
    instruction: '봉투를 클릭해서 지원서를 열어보세요',
    menuLabel: '메뉴 열기',
  },
  resume: {
    sidebarTitle: '지원서 목차',
    checklistTitle: '검토 현황',
    completeButton: '검토 완료',
  },
  result: {
    title: '최종 검토 결과',
    description: '지원서 검토가 완료되었습니다.',
    restartButton: '처음으로 돌아가기',
  },
} as const
