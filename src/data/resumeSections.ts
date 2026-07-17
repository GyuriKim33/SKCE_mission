import weDoTechnology from '../assets/logos/we-do-technology.png'

export interface ResumeSectionData {
  id: string
  title: string
  body: string
  subtitle?: string
  companyProfile?: {
    name: string
    intro: string
    tagline: string
    information: readonly {
      label: string
      value: string
      image?: string
      icon:
        | 'building'
        | 'calendar'
        | 'location'
        | 'business'
        | 'product'
        | 'people'
        | 'global'
        | 'slogan'
    }[]
  }
  applicationInformation?: readonly {
    label: string
    headline: string
    description: string
    icon: 'route' | 'referrer' | 'company'
  }[]
}

export const resumeSections = [
  {
    id: 'personal-information',
    title: '01 인적사항',
    body: '',
    subtitle: '기업 정보',
    companyProfile: {
      name: 'SK hynix',
      intro: 'AI 시대를 선도하는\n메모리 혁신의 창조자',
      tagline: 'Technology Innovator\nfor a Better World',
      information: [
        { label: '기업명', value: 'SK하이닉스', icon: 'building' },
        {
          label: '반도체 사업 개시일',
          value: '1983년 2월',
          icon: 'calendar',
        },
        {
          label: '업종',
          value: '반도체 소자 제조와 판매',
          icon: 'business',
        },
        { label: '본사 소재', value: '경기도 이천시', icon: 'location' },
        {
          label: '핵심 제품',
          value: 'HBM · DRAM · NAND Flash',
          icon: 'product',
        },
        {
          label: '주요 사업장',
          value: '이천 · 청주 · 분당 · 글로벌 법인',
          icon: 'global',
        },
        {
          label: '브랜드 슬로건',
          value: 'We Do Technology',
          icon: 'slogan',
          image: weDoTechnology,
        },
      ],
    },
  },
  {
    id: 'application-information',
    title: '02 지원 정보',
    body: '',
    applicationInformation: [
      {
        label: '지원 경로',
        headline: '당신의 관심',
        description: 'SK Careers를 통해\n우리를 알게 되었습니다.',
        icon: 'route',
      },
      {
        label: '추천인',
        headline: '미래의 당신',
        description: '성장한 당신의 모습이\n지금의 당신을 추천합니다.',
        icon: 'referrer',
      },
      {
        label: '지원 기업',
        headline: '당신의 관심기업',
        description:
          '당신의 가능성과 시너지를 낼 수 있는\n관심기업이 되길 희망합니다.',
        icon: 'company',
      },
    ],
  },
  {
    id: 'education',
    title: '03 학력',
    body: '',
  },
  {
    id: 'achievements',
    title: '04 주요 성과',
    body: '',
  },
  {
    id: 'experience-description',
    title: '05 경험기술서',
    body: '',
  },
  {
    id: 'self-introduction',
    title: '06 자기소개서',
    body: '',
  },
  {
    id: 'final-question',
    title: '07 마지막 질문',
    body: '',
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
