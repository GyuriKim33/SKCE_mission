import { Menu } from 'lucide-react'
import logo from '../../assets/logos/sk-careers-editor-logo.png'
import { appContent } from '../../data/resumeSections'

interface HeaderProps {
  pageTitle: string
}

export function Header({ pageTitle }: HeaderProps) {
  return (
    <header className="header" aria-label={pageTitle}>
      <img className="header-logo" src={logo} alt={appContent.brandName} />
      <button
        className="menu-button"
        type="button"
        aria-label={appContent.landing.menuLabel}
      >
        <Menu aria-hidden="true" strokeWidth={1.8} />
      </button>
    </header>
  )
}
