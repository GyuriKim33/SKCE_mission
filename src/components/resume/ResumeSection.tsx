import {
  Building2,
  CalendarDays,
  Cpu,
  Database,
  Globe2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Megaphone,
  RefreshCw,
  Send,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'motion/react'
import skHynixLogo from '../../assets/logos/logo.jpg'
import type { ResumeSectionData } from '../../data/resumeSections'

interface ResumeSectionProps {
  section: ResumeSectionData
}

type CompanyInfoIcon =
  ResumeSectionData['companyProfile'] extends infer Profile
    ? Profile extends { information: readonly (infer Item)[] }
      ? Item extends { icon: infer Icon }
        ? Icon
        : never
      : never
    : never

const companyInfoIcons: Record<CompanyInfoIcon, LucideIcon> = {
  building: Building2,
  calendar: CalendarDays,
  location: MapPin,
  business: Cpu,
  product: Database,
  people: Users,
  global: Globe2,
  slogan: Megaphone,
}

const applicationInformationIcons = {
  route: Send,
  referrer: Users,
  company: Target,
} satisfies Record<
  NonNullable<ResumeSectionData['applicationInformation']>[number]['icon'],
  LucideIcon
>

const educationMuscleIcons = {
  thinking: Lightbulb,
  adaptation: RefreshCw,
  empathy: HeartHandshake,
} satisfies Record<
  NonNullable<ResumeSectionData['educationProfile']>['muscles'][number]['icon'],
  LucideIcon
>

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.25 },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export function ResumeSection({ section }: ResumeSectionProps) {
  if (section.companyProfile) {
    const [number, ...titleParts] = section.title.split(' ')

    return (
      <motion.section
        {...sectionReveal}
        className="resume-section resume-section--company-profile"
        id={section.id}
      >
        <header className="resume-section-heading">
          <span className="resume-section-number">{number}</span>
          <h2>{titleParts.join(' ')}</h2>
          {section.subtitle && (
            <span className="resume-section-subtitle">{section.subtitle}</span>
          )}
        </header>

        <div className="company-profile-layout">
          <article className="company-intro-card">
            <img
              className="company-logo"
              src={skHynixLogo}
              alt={section.companyProfile.name}
            />
            <div className="company-intro-copy">
              <strong>{section.companyProfile.intro}</strong>
              <span>{section.companyProfile.tagline}</span>
            </div>
          </article>

          <dl className="company-information-card">
            {section.companyProfile.information.map((item) => {
              const Icon = companyInfoIcons[item.icon]

              return (
                <div
                  className={`company-information-item company-information-item--${item.icon}`}
                  key={item.label}
                >
                  <span className="company-information-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <dt>{item.label}</dt>
                    <dd>
                      {item.image ? (
                        <img
                          className="company-slogan-image"
                          src={item.image}
                          alt={item.value}
                        />
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </div>
      </motion.section>
    )
  }

  if (section.applicationInformation) {
    const [number, ...titleParts] = section.title.split(' ')

    return (
      <motion.section
        {...sectionReveal}
        className="resume-section resume-section--application-information"
        id={section.id}
      >
        <header className="resume-section-heading">
          <span className="resume-section-number">{number}</span>
          <h2>{titleParts.join(' ')}</h2>
        </header>

        <div className="application-information-grid">
          {section.applicationInformation.map((item) => {
            const Icon = applicationInformationIcons[item.icon]

            return (
              <article className="application-information-card" key={item.label}>
                <span className="application-information-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div className="application-information-copy">
                  <small>{item.label}</small>
                  <strong>{item.headline}</strong>
                  <p>{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </motion.section>
    )
  }

  if (section.educationProfile) {
    const [number, ...titleParts] = section.title.split(' ')
    const { degree, muscles, growth } = section.educationProfile

    return (
      <motion.section
        {...sectionReveal}
        className="resume-section resume-section--education"
        id={section.id}
      >
        <header className="resume-section-heading">
          <span className="resume-section-number">{number}</span>
          <h2>{titleParts.join(' ')}</h2>
        </header>

        <div className="education-card-layout">
          <article className="education-degree-card">
            <header>
              <span>{degree.label}</span>
              <span className="education-degree-icon" aria-hidden="true">
                <GraduationCap />
              </span>
            </header>
            <strong className="education-degree-value">{degree.value}</strong>
            <p className="education-policy-copy">
              <span>{degree.effectiveDate}</span>
              <span>
                {degree.policyPrefix} <b>{degree.policyEmphasis}</b>했습니다.
              </span>
            </p>
            <div className="education-former-requirement">
              <small>기존 채용공고의</small>
              <p>
                <span>
                  <b>{degree.formerRequirement}</b>
                  {degree.formerRequirementSuffix.replace('삭제했습니다.', '')}
                </span>
                <span>
                  <span className="education-deletion-emphasis">삭제</span>했습니다.
                </span>
              </p>
            </div>
          </article>

          <article className="education-muscles-card">
            <h3>
              우리가 찾는 <b>3대 근육</b>
            </h3>
            <div className="education-muscle-list">
              {muscles.map((muscle) => {
                const Icon = educationMuscleIcons[muscle.icon]

                return (
                  <div className="education-muscle-item" key={muscle.title}>
                    <span className="education-muscle-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <strong>{muscle.title}</strong>
                      <p>{muscle.description}</p>
                    </div>
                  </div>
                )
              })}
              <span className="education-muscle-center">
                <img src={skHynixLogo} alt="SK hynix" />
                <small>AI Talent</small>
              </span>
            </div>
          </article>

          <article className="education-growth-card">
            <span className="education-growth-icon" aria-hidden="true">
              <Heart />
            </span>
            <div>
              <p className="education-growth-lead">
                {growth.label} {growth.firstLine}
              </p>
              <strong>{growth.emphasis}</strong>
            </div>
          </article>
        </div>
      </motion.section>
    )
  }

  if (section.careerProfile) {
    const [number, ...titleParts] = section.title.split(' ')
    const career = section.careerProfile

    return (
      <motion.section
        {...sectionReveal}
        className="resume-section resume-section--career"
        id={section.id}
      >
        <header className="resume-section-heading">
          <span className="resume-section-number">{number}</span>
          <h2>{titleParts.join(' ')}</h2>
        </header>

        <motion.div
          className="career-timeline-card"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
        >
          <div className="career-timeline-scroll">
            <span className="career-timeline-line" aria-hidden="true" />
            <ol className="career-timeline-list">
              {career.events.map((event, index) => (
                <li key={event.year}>
                  <motion.span
                    className="career-timeline-dot"
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.22 + index * 0.09,
                      ease: 'easeOut',
                    }}
                  />
                  <time>{event.year}</time>
                  <p>{event.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.h3
          className="career-headline career-progress-headline"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span>{career.messagePrefix}</span>
          <b>{career.messageEmphasis}</b>
        </motion.h3>
      </motion.section>
    )
  }

  if (section.technologyExperience) {
    const [number, ...titleParts] = section.title.split(' ')
    const experience = section.technologyExperience

    return (
      <motion.section
        {...sectionReveal}
        className="resume-section resume-section--technology-experience"
        id={section.id}
      >
        <header className="resume-section-heading">
          <span className="resume-section-number">{number}</span>
          <h2>{titleParts.join(' ')}</h2>
        </header>

        <div className="technology-experience-intro">
          <h3>{experience.title}</h3>
          <p>{experience.description}</p>
        </div>

        <div className="technology-card-grid">
          {experience.technologies.map((technology) => (
            <article
              className={`technology-card technology-card--${technology.illustration}`}
              key={technology.name}
            >
              <small>{technology.eyebrow}</small>
              <h4>{technology.name}</h4>
              <p>{technology.fullName}</p>
              <span className="technology-illustration" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
            </article>
          ))}
        </div>

        <p className="technology-card-instruction">
          <span aria-hidden="true">ⓘ</span>
          {experience.instruction}
        </p>
      </motion.section>
    )
  }

  if (section.selfIntroduction) {
    const [number, ...titleParts] = section.title.split(' ')
    const introduction = section.selfIntroduction

    return (
      <motion.section
        {...sectionReveal}
        className="resume-section resume-section--self-introduction"
        id={section.id}
      >
        <header className="resume-section-heading">
          <span className="resume-section-number">{number}</span>
          <h2>{titleParts.join(' ')}</h2>
        </header>

        <div className="self-introduction-heading">
          <h3>
            <span>{introduction.titleFirst}</span>
            <span>{introduction.titleSecond}</span>
          </h3>
          <span aria-hidden="true" />
        </div>

        <div className="self-introduction-questions">
          {introduction.questions.map((question) => (
            <article className="self-introduction-card" key={question.number}>
              <div className="self-introduction-question">
                <small>{question.number}</small>
                <h4>{question.question}</h4>
                {question.description && <p>{question.description}</p>}
              </div>

              <div className="self-introduction-answer">
                <span className="self-introduction-quote" aria-hidden="true">
                  “
                </span>
                {question.answer && (
                  <p className="self-introduction-answer-copy">{question.answer}</p>
                )}
                {question.evaluationKeyword && (
                  <div className="self-introduction-evaluation">
                    <small>Evaluation Keyword</small>
                    <strong>{question.evaluationKeyword}</strong>
                  </div>
                )}
                {question.hashtagStatement && (
                  <div className="self-introduction-hashtags">
                    {question.hashtagStatement.map((part) => (
                      <span key={part.tag}>
                        <b>{part.tag}</b>
                        {part.suffix}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="self-introduction-instruction">
          {introduction.instruction}
        </p>
      </motion.section>
    )
  }

  return (
    <motion.section
      {...sectionReveal}
      className="resume-section"
      id={section.id}
    >
      <h2>{section.title}</h2>
      {section.body && <p>{section.body}</p>}
    </motion.section>
  )
}
