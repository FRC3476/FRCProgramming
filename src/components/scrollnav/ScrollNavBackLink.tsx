import { Link, useLocation } from 'react-router-dom'

type ScrollNavBackLinkProps = {
  isCompact?: boolean
}

function formatSectionLabel(section: string): string {
  return section.charAt(0).toUpperCase() + section.slice(1)
}

export function ScrollNavBackLink({ isCompact = false }: ScrollNavBackLinkProps) {
  const { pathname } = useLocation()
  const pathSegments = pathname.split('/').filter(Boolean)

  if (pathSegments.length < 2) {
    return null
  }

  const section = pathSegments[0]
  const label = `Back to ${formatSectionLabel(section)}`

  return (
    <Link
      to={`/${section}`}
      className="scroll-nav__back"
      aria-label={isCompact ? label : undefined}
    >
      <span className="scroll-nav__back-arrow" aria-hidden="true">
        ←
      </span>
      <span className="scroll-nav__back-text" aria-hidden={isCompact ? true : undefined}>
        {label}
      </span>
    </Link>
  )
}
