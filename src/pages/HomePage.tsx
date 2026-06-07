import { LEARN_PATH } from '../routes'
import './HomePage.css'

type HomePageProps = {
  onStartLearning: () => void
}

const FEATURES = [
  {
    title: 'Java & WPILib',
    desc: 'Master the official FRC framework from subsystems to full robot control loops.',
    tag: 'Core',
  },
  {
    title: 'Control Systems',
    desc: 'Learn how to control your systems with how the APIs function to control methods.',
    tag: 'Architecture',
  },
  {
    title: 'Vision & Sensors',
    desc: 'Integrate PhotonVision, Limelight, encoders, gyros, and more.',
    tag: 'Hardware',
  },
  {
    title: 'Auto Path Planning',
    desc: 'Build auto routines with PathPlanner and trajectory generation tools.',
    tag: 'Autonomous',
  },
  {
    title: 'Tuning & Debugging',
    desc: 'Use AdvantageKit, Shuffleboard, and logging to dial in your robot.',
    tag: 'Tooling',
  },
  {
    title: 'Version Control',
    desc: 'Utilize real world development tools to improve your programming experience during season.',
    tag: 'Development',
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
        <h1 className="hero-title">A resource for learning FRC robot programming</h1>
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
          <a href="#" className="btn-ghost">
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
      </section>
      <section className="features-section">
        <div className="section-header">
          <p className="section-eyebrow">What you'll learn</p>
          <h2 className="section-title centered">
            Everything from intake to
            <br />
            <span className="accent-pink">autonomous routines</span>
          </h2>
        </div>
        <div className="features-grid">
          {FEATURES.map(feature => (
            <div key={feature.title} className="feature-card">
              <div className="feature-top">
                <span className="feature-tag">{feature.tag}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
