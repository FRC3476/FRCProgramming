import { Link } from 'react-router-dom'
import { advancedCurriculum } from '../../data/curriculum'
import './AdvancedIndexPage.css'

export function AdvancedIndexPage() {
  return (
    <main className="page">
      <section className="page-section advanced-index">
        <h1>Advanced</h1>
        <p className="page-text">
          Pick a guide below to get started. Each page covers one topic with its own
          section navigation.
        </p>
        <nav className="advanced-toc" aria-label="advanced curriculum">
          <ul className="advanced-toc__list">
            {advancedCurriculum.map(({ slug, title }, index) => (
              <li key={slug} className="advanced-toc__item">
                <Link to={`/advanced/${slug}`} className="advanced-toc__link">
                  <span className="advanced-toc__title">
                    {index + 1}. {title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  )
}