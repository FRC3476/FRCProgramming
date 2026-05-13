import { useState, useEffect } from 'react'
import './App.css'

const NAV_LINKS = ['Learn', 'Projects', 'Community', 'Docs']

const FEATURES = [
  {
    title: 'Java & WPILib',
    desc: 'Master the official FRC framework from subsystems to full robot control loops.',
    tag: 'Core',
  },
  {
    title: 'Command-Based',
    desc: 'Learn the command-based architecture that powers competitive FRC robots.',
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
    title: 'Competition Ready',
    desc: 'Deploy, test, and iterate under real competition constraints.',
    tag: 'Deploy',
  },
]


function TypewriterText({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [pausing, setPausing] = useState(false)

  useEffect(() => {
    if (pausing) return
    const current = texts[textIdx]
    const delay = deleting ? 40 : 90
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setPausing(true)
          setTimeout(() => { setPausing(false); setDeleting(true) }, 1800)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setTextIdx(i => (i + 1) % texts.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, delay)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts, pausing])

  return (
    <span className="typewriter">
      {displayed}<span className="cursor">|</span>
    </span>
  )
}

function syntaxHighlight(code: string): string {
  const keywords = ['public', 'class', 'extends', 'private', 'final', 'new', 'return', 'void']
  const types = ['CANSparkMax', 'SparkPIDController', 'SubsystemBase', 'MotorType', 'ControlType', 'Command', 'double', 'int']

  let result = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  result = result.replace(/(\/\/[^\n]*)/g, '<span class="cm">$1</span>')
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="cn">$1</span>')
  keywords.forEach(k => {
    result = result.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span class="ck">$1</span>')
  })
  types.forEach(t => {
    result = result.replace(new RegExp(`\\b(${t})\\b`, 'g'), '<span class="ct">$1</span>')
  })
  result = result.replace(/\b([a-z][a-zA-Z]+)(\()/g, '<span class="cf">$1</span>$2')

  return result
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <div className="grid-bg" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="logo">
            <span className="logo-bracket">&lt;</span>
            FRC<span className="logo-accent">Dev</span>
            <span className="logo-bracket">/&gt;</span>
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {NAV_LINKS.map(l => (
              <a key={l} href="#" className="nav-link" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
            <a href="#" className="nav-cta">Start Learning →</a>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">
          A resource for learning FRC robot programming
        </h1>
        <div className="hero-actions">
          <a href="#" className="btn-primary">Get Started Free</a>
          <a href="#" className="btn-ghost">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-header">
          <p className="section-eyebrow">What you'll learn</p>
          <h2 className="section-title centered">Everything from intake to<br /><span className="accent-pink">autonomous routines</span></h2>
        </div>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-top">
                <span className="feature-tag">{f.tag}</span>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="logo-bracket">&lt;</span>
          FRC<span className="logo-accent">Dev</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer-copy">Built for FRC teams, by FRC alumni. Not affiliated with FIRST®.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  )
}