import type { MouseEvent } from 'react'
import { HOME_PATH, LEARN_PATH, type AppPath } from '../routes'

type NavLink = {
  label: string
  path?: AppPath
}

type SiteNavProps = {
  activePath: AppPath
  menuOpen: boolean
  onCloseMenu: () => void
  onNavigate: (path: AppPath) => void
  onToggleMenu: () => void
}

const NAV_LINKS = [
  { label: 'Learn', path: LEARN_PATH },
  { label: 'Projects' },
  { label: 'Community' },
  { label: 'Docs' },
] satisfies readonly NavLink[]

export function SiteNav({
  activePath,
  menuOpen,
  onCloseMenu,
  onNavigate,
  onToggleMenu,
}: SiteNavProps) {
  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, path?: AppPath) => {
    event.preventDefault()

    if (path) {
      onNavigate(path)
      return
    }

    onCloseMenu()
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href={HOME_PATH} className="logo" onClick={event => handleNavClick(event, HOME_PATH)}>
          <span className="logo-bracket">&lt;</span>
          FRC
          <span className="logo-accent">Dev</span>
          <span className="logo-bracket">/&gt;</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.path ?? '#'}
              className={`nav-link ${link.path === activePath ? 'active' : ''}`}
              onClick={event => handleNavClick(event, link.path)}
            >
              {link.label}
            </a>
          ))}
          <a href={LEARN_PATH} className="nav-cta" onClick={event => handleNavClick(event, LEARN_PATH)}>
            Start Learning →
          </a>
        </div>
        <button className="hamburger" onClick={onToggleMenu} aria-label="Toggle menu" type="button">
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
