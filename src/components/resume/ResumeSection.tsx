import {
  Building2,
  CalendarDays,
  Cpu,
  Database,
  Globe2,
  MapPin,
  Megaphone,
  Users,
  type LucideIcon,
} from 'lucide-react'
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

export function ResumeSection({ section }: ResumeSectionProps) {
  if (section.companyProfile) {
    const [number, ...titleParts] = section.title.split(' ')

    return (
      <section
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
      </section>
    )
  }

  return (
    <section className="resume-section" id={section.id}>
      <h2>{section.title}</h2>
      {section.body && <p>{section.body}</p>}
    </section>
  )
}
