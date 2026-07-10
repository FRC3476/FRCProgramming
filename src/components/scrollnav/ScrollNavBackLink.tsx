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

  return (
    <Link to={`/${section}`} className="scroll-nav__back">
      ← Back to {formatSectionLabel(section)}
    </Link>
  )
}
