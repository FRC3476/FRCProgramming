import { Link } from 'react-router-dom'
import {
  getNextLesson,
  getPreviousLesson,
  type CurriculumEntry,
} from '../../data/curriculum'
import './AdvanceNav.css'

type AdvanceNavProps = {
  section: string
  slug: string
  entries: CurriculumEntry[]
}

export function AdvanceNav({ section, slug, entries }: AdvanceNavProps) {
  const previous = getPreviousLesson(entries, slug)
  const next = getNextLesson(entries, slug)

  if (!previous && !next) {
    return null
  }

  return (
    <nav className="advance-nav" aria-label="Lesson navigation">
      {previous ? (
        <Link
          to={`/${section}/${previous.slug}`}
          className="advance-nav__link advance-nav__link--previous"
        >
          <span className="advance-nav__arrow" aria-hidden="true">
            ←
          </span>
          <span className="advance-nav__label">Previous: {previous.title}</span>
        </Link>
      ) : null}
      {next ? (
        <Link
          to={`/${section}/${next.slug}`}
          className="advance-nav__link advance-nav__link--next"
        >
          <span className="advance-nav__label">Next: {next.title}</span>
          <span className="advance-nav__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
