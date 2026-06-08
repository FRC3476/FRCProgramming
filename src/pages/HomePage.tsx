import { LEARN_PATH } from '../routes'
import './HomePage.css'
import wpilibIcon from '../assets/wpilib-icon.svg'

type HomePageProps = {
  onStartLearning: () => void
}

const CARDS = [
  {
    title: 'How to Use this Site',
    desc: 'Learn what prerequisites you need to get started, and how to use this site to learn FRC programming.',
    tag: 'Getting Started',
  },
  {
    title: 'Code Examples',
    desc: 'Example code from various top teams explaining their codebase.',
    tag: 'Examples',
  },
  {
    title: 'Website Curriculum',
    desc: 'Learn about the material that is covered, and how it is structured.',
    tag: 'Curriculum',
  },
  {
    title: 'Development Tools',
    desc: 'Utilize real world development tools to improve your programming experience during season.',
    tag: 'Tools',
  },
] satisfies readonly {
  title: string
  desc: string
  tag: string
}[]

export function HomePage({ onStartLearning }: HomePageProps) {
  return (
    <>
      <section className="hero">
        <div className="hero-layout">
          <div className="hero-copy">
            <h1 className="hero-title"> Welcome to FRCdev </h1>
            <h2 className="hero-context">A resource for learning FRC robot programming</h2>
            <div className="hero-actions">
              <a
                href={LEARN_PATH}
                className="btn-primary"
                onClick={event => {
                  event.preventDefault()
                  onStartLearning()
                }}
              >
                Start Learning
              </a>
              <a
                href="https://github.com/FRC3476/FRCProgramming"
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
          {/* todo: temporary image, replace with actual image */}
          <img src={wpilibIcon} alt="WPILib Icon" className="hero-image" />
        </div>
      </section>
      <section className="cards-section">
        <div className="cards-grid">
          {CARDS.map(card => (
            <div key={card.title} className="card-item">
              <div className="card-top">
                <span className="card-tag">{card.tag}</span>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
