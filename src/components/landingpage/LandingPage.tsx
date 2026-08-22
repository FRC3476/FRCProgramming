import { Link } from 'react-router-dom'
import './LandingPage.css'

const paths = [
  {
    to: '/introduction',
    title: 'Introduction',
    description: 'How to use this site, prerequisites, and notes before you start.',
  },
  {
    to: '/beginner',
    title: 'Beginner',
    description: 'Start from a first project and build up through subsystems, commands, and simulation.',
  },
  {
    to: '/advanced',
    title: 'Advanced',
    description: 'Deeper topics once the basics are in place.',
  },
] as const

export function LandingPage() {
  return (
    <main className="page">
      <section className="page-section landing">
        <h1>FRC Curriculum</h1>
        <p className="page-text">
          A guide that covers not just how to write FRC code, but how to write good
          code in general — organization, tools, and the parts most motor-and-PID
          tutorials skip.
        </p>
        <nav className="landing-paths" aria-label="Curriculum paths">
          <ul className="landing-paths__list">
            {paths.map(({ to, title, description }) => (
              <li key={to} className="landing-paths__item">
                <Link to={to} className="landing-paths__link">
                  <span className="landing-paths__title">{title}</span>
                  <span className="landing-paths__description">{description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  )
}
