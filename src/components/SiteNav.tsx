import type { MouseEventHandler } from 'react'
import { HOME_PATH, LEARN_PATH, COMMUNITY_PATH, type AppPath } from '../routes'

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
  { label: 'Community', path: COMMUNITY_PATH },
  { label: 'Learn', path: LEARN_PATH },
] satisfies readonly NavLink[]

export function SiteNav({ activePath, menuOpen, onCloseMenu, onNavigate, onToggleMenu,}: SiteNavProps) {
  const handleNavClick =
    (path?: AppPath): MouseEventHandler<HTMLAnchorElement> =>
    clickEvent => {
      clickEvent.preventDefault()

      if (path) {
        onNavigate(path)
        return
      }

      onCloseMenu()
    }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a
          href={HOME_PATH}
          className="logo"
          onClick={handleNavClick(HOME_PATH)}
        >
          <span className="logo-bracket">&lt;</span>
          FRC
          <span className="logo-accent">dev</span>
          <span className="logo-bracket">/&gt;</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.path ?? '#'}
              className={`nav-link ${link.path === activePath ? 'active' : ''}`}
              onClick={handleNavClick(link.path)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="hamburger"
          onClick={onToggleMenu}
          aria-label="Toggle menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
