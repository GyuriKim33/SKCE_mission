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
  educationProfile?: {
    degree: {
      label: string
      value: string
      effectiveDate: string
      policyPrefix: string
      policyEmphasis: string
      formerRequirement: string
      formerRequirementSuffix: string
    }
    muscles: readonly {
      title: string
      description: string
      icon: 'thinking' | 'adaptation' | 'empathy'
    }[]
    growth: {
      label: string
      firstLine: string
      emphasis: string
    }
  }
  careerProfile?: {
    events: readonly {
      year: string
      description: string
    }[]
    messagePrefix: string
    messageEmphasis: string
  }
  technologyExperience?: {
    title: string
    description: string
    instruction: string
    technologies: readonly {
      eyebrow: string
      name: string
      fullName: string
      illustration: 'hbm' | 'dram' | 'nand' | 'cxl' | 'packaging'
    }[]
  }
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
    educationProfile: {
      degree: {
        label: '최종학력',
        value: '무관',
        effectiveDate: '2026년 6월 수시채용부터',
        policyPrefix: '학력 제한을',
        policyEmphasis: '전면 폐지',
        formerRequirement: '4년제 학사 이상',
        formerRequirementSuffix: '지원 자격을 삭제했습니다.',
      },
      muscles: [
        {
          title: '생각 근육',
          description: '본질을 파고드는 힘',
          icon: 'thinking',
        },
        {
          title: '적응 근육',
          description: '변화를 기회로 만드는 힘',
          icon: 'adaptation',
        },
        {
          title: '공감 근육',
          description: '함께 성장하는 힘',
          icon: 'empathy',
        },
      ],
      growth: {
        label: 'AI 시대에 필요한 것은',
        firstLine: '정형화된 스펙이 아닙니다.',
        emphasis: '복잡한 문제를 해결하는 힘입니다.',
      },
    },
  },
  {
    id: 'achievements',
    title: '04 경력',
    body: '',
    careerProfile: {
      events: [
        { year: '1983', description: '현대전자\n반도체 사업 시작' },
        { year: '2001', description: '하이닉스반도체\n출범' },
        { year: '2012', description: 'SK하이닉스\n출범' },
        { year: '2013', description: '세계 최초\n20nm DDR3' },
        { year: '2018', description: '세계 최초\n72단 3D NAND' },
        { year: '2024', description: '세계 최초\n12단 HBM3E' },
        { year: '2025', description: 'HBM4\n개발 완료·양산 체계 구축' },
      ],
      messagePrefix: '지금도, SK하이닉스의 도전은',
      messageEmphasis: '현재 진행형입니다.',
    },
  },
  {
    id: 'experience-description',
    title: '05 경험기술서',
    body: '',
    technologyExperience: {
      title: '우리가 만들어 온 기술',
      description: 'SK하이닉스의 핵심 기술들을 소개합니다.',
      instruction: '카드를 클릭하면 각 기술의 상세 내용을 확인할 수 있습니다.',
      technologies: [
        {
          eyebrow: 'TECH 1',
          name: 'HBM',
          fullName: 'High Bandwidth Memory',
          illustration: 'hbm',
        },
        {
          eyebrow: 'TECH 2',
          name: 'DRAM',
          fullName: 'Dynamic Random Access Memory',
          illustration: 'dram',
        },
        {
          eyebrow: 'TECH 3',
          name: 'NAND Flash',
          fullName: 'Non-Volatile Memory',
          illustration: 'nand',
        },
        {
          eyebrow: 'TECH 4',
          name: 'CXL Memory',
          fullName: 'Compute Express Link',
          illustration: 'cxl',
        },
        {
          eyebrow: 'TECH 5',
          name: 'Advanced Packaging',
          fullName: 'Packaging Technology',
          illustration: 'packaging',
        },
      ],
    },
  },
  {
    id: 'self-introduction',
    title: '06 자기소개서',
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
