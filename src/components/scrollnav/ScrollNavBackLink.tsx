import { Link, useLocation } from 'react-router-dom'

function formatSectionLabel(section: string): string {
  return section.charAt(0).toUpperCase() + section.slice(1)
}

export function ScrollNavBackLink() {
  const { pathname } = useLocation()
  const pathSegments = pathname.split('/').filter(Boolean)

  if (pathSegments.length < 2) {
    return null
  }

  const section = pathSegments[0]

  if (section === 'beginner') {
    return (
      <Link to="/" className="scroll-nav__back">
        <span className="scroll-nav__back-arrow" aria-hidden="true">
          ←
        </span>
        <span className="scroll-nav__back-text">Back to landing page</span>
      </Link>
    )
  }

  const label = `Back to ${formatSectionLabel(section)}`

  return (
    <Link to={`/${section}`} className="scroll-nav__back">
      <span className="scroll-nav__back-arrow" aria-hidden="true">
        ←
      </span>
      <span className="scroll-nav__back-text">{label}</span>
    </Link>
  )
}
