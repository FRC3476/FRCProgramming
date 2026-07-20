import { Link } from 'react-router-dom'
import { getNextLesson, type CurriculumEntry } from '../../data/curriculum'
import './AdvanceNav.css'

type AdvanceNavProps = {
  section: string
  slug: string
  entries: CurriculumEntry[]
}

export function AdvanceNav({ section, slug, entries }: AdvanceNavProps) {
  const next = getNextLesson(entries, slug)

  if (!next) {
    return null
  }

  return (
    <nav className="advance-nav" aria-label="Next lesson">
      <Link to={`/${section}/${next.slug}`} className="advance-nav__link">
        <span className="advance-nav__label">Next: {next.title}</span>
        <span className="advance-nav__arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </nav>
  )
}
