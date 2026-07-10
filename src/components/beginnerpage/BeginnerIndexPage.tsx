import { Link } from 'react-router-dom'
import { curriculum } from '../../data/curriculum'
import './BeginnerIndexPage.css'

export function BeginnerIndexPage() {
  return (
    <main className="page">
      <section className="page-section beginner-index">
        <h1>Beginner</h1>
        <p className="page-text">
          Pick a guide below to get started. Each page covers one topic with its own
          section navigation.
        </p>
        <nav className="beginner-toc" aria-label="Beginner curriculum">
          <ol className="beginner-toc__list">
            {curriculum.map(({ slug, title }, index) => (
              <li key={slug} className="beginner-toc__item">
                <Link to={`/beginner/${slug}`} className="beginner-toc__link">
                  <span className="beginner-toc__number">{index + 1}</span>
                  <span className="beginner-toc__title">{title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </main>
  )
}
