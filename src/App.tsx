import { useState, useEffect } from 'react'
import './App.css'

const NAV_LINKS = ['Learn', 'Projects', 'Community', 'Docs']

const FEATURES = [
  {
    icon: '⚡',
    title: 'Java & WPILib',
    desc: 'Master the official FRC framework from subsystems to full robot control loops.',
    tag: 'Core',
  },
  {
    icon: '🤖',
    title: 'Command-Based',
    desc: 'Learn the command-based architecture that powers competitive FRC robots.',
    tag: 'Architecture',
  },
  {
    icon: '📡',
    title: 'Vision & Sensors',
    desc: 'Integrate PhotonVision, Limelight, encoders, gyros, and more.',
    tag: 'Hardware',
  },
  {
    icon: '🗺️',
    title: 'Auto Path Planning',
    desc: 'Build auto routines with PathPlanner and trajectory generation tools.',
    tag: 'Autonomous',
  },
  {
    icon: '📊',
    title: 'Tuning & Debugging',
    desc: 'Use AdvantageKit, Shuffleboard, and logging to dial in your robot.',
    tag: 'Tooling',
  },
  {
    icon: '🏆',
    title: 'Competition Ready',
    desc: 'Deploy, test, and iterate under real competition constraints.',
    tag: 'Deploy',
  },
]

const CODE_SNIPPET = `public class ShooterSubsystem extends SubsystemBase {
  private final CANSparkMax motor =
      new CANSparkMax(SHOOTER_ID, MotorType.kBrushless);

  private final SparkPIDController pid =
      motor.getPIDController();

  public ShooterSubsystem() {
    pid.setP(0.0003);
    pid.setFF(0.000175);
  }

  public Command spinUp(double rpm) {
    return runEnd(
      () -> pid.setReference(rpm, ControlType.kVelocity),
      () -> motor.stopMotor()
    );
  }
}`

const STEPS = [
  { num: '01', title: 'Set Up Your Dev Environment', desc: 'Install VS Code, WPILib, and connect to your roboRIO.' },
  { num: '02', title: 'Learn the Fundamentals', desc: 'Understand subsystems, commands, and robot lifecycle.' },
  { num: '03', title: 'Build Real Subsystems', desc: 'Drive trains, shooters, climbers — hands-on from day one.' },
  { num: '04', title: 'Compete & Iterate', desc: 'Tune, log, and optimize your way to the top of the rankings.' },
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
        <div className="hero-badge">
          <span className="badge-dot" />
          Season 2025 · Reefscape
        </div>
        <h1 className="hero-title">
          Write code that<br />
          <TypewriterText texts={['wins matches.', 'scores points.', 'moves robots.', 'beats the clock.']} />
        </h1>
        <p className="hero-sub">
          The complete resource for learning FRC robot programming —<br className="br-hide" />
          from your first subsystem to championship auto routines.
        </p>
        <div className="hero-actions">
          <a href="#" className="btn-primary">Get Started Free</a>
          <a href="#" className="btn-ghost">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            View on GitHub
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">2,400+</span><span className="stat-label">Students</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">180+</span><span className="stat-label">Teams</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">60+</span><span className="stat-label">Lessons</span></div>
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
                <span className="feature-icon">{f.icon}</span>
                <span className="feature-tag">{f.tag}</span>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="steps-section">
        <div className="section-header">
          <p className="section-eyebrow">The path forward</p>
          <h2 className="section-title centered">Zero to competition<br /><span className="accent-cyan">in four steps</span></h2>
        </div>
        <div className="steps-list">
          {STEPS.map((s, i) => (
            <div key={s.num} className="step">
              <div className="step-left">
                <div className="step-num">{s.num}</div>
                {i < STEPS.length - 1 && <div className="step-line" />}
              </div>
              <div className="step-content">
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <p className="cta-eyebrow">Ready to build?</p>
          <h2 className="cta-title">Your robot is waiting<br />for better code.</h2>
          <p className="cta-body">Join thousands of FRC students leveling up their programming game.</p>
          <a href="#" className="btn-primary large">Start Learning for Free →</a>
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