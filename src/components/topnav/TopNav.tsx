import { NavLink } from 'react-router-dom'
import { SCROLL_NAV_ID, useSidebarNav } from '../scrollnav/sidebarNavContext'
import './TopNav.css'

function MenuIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M2 3.5h12v1.5H2zm0 3.75h12v1.5H2zM2 11h12v1.5H2z"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3.28 2.22 8 6.94l4.72-4.72 1.06 1.06L9.06 8l4.72 4.72-1.06 1.06L8 9.06l-4.72 4.72-1.06-1.06L6.94 8 2.22 3.28z"
      />
    </svg>
  )
}

export function TopNav() {
  const { hasSidebar, overlayOpen, toggleOverlay } = useSidebarNav()

  return (
    <header className="top-nav">
      <div className="top-nav__start">
        {hasSidebar ? (
          <button
            type="button"
            className="top-nav__sidebar-toggle"
            aria-expanded={overlayOpen}
            aria-controls={SCROLL_NAV_ID}
            aria-label={overlayOpen ? 'Close section navigation' : 'Open section navigation'}
            onClick={toggleOverlay}
          >
            {overlayOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        ) : null}
        <NavLink to="/" className="top-nav__brand">
          FRC Curriculum
        </NavLink>
      </div>
      <nav className="top-nav__links" aria-label="Site sections">
        <NavLink to="/introduction" className="top-nav__link">
          Introduction
        </NavLink>
        <NavLink to="/beginner" className="top-nav__link">
          Beginner
        </NavLink>
        <NavLink to="/advanced" className="top-nav__link">
          Advanced
        </NavLink>
      </nav>
    </header>
  )
}
