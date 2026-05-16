import { createElement, useState } from 'react'
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return createElement(
    'div',
    { className: 'app' },
    createElement('div', { className: 'grid-bg', 'aria-hidden': true }),
    createElement('div', { className: 'noise-overlay', 'aria-hidden': true }),
    createElement(
      'nav',
      { className: 'nav' },
      createElement(
        'div',
        { className: 'nav-inner' },
        createElement(
          'a',
          { href: '#', className: 'logo' },
          createElement('span', { className: 'logo-bracket' }, '<'),
          'FRC',
          createElement('span', { className: 'logo-accent' }, 'Dev'),
          createElement('span', { className: 'logo-bracket' }, '/>'),
        ),
        createElement(
          'div',
          { className: `nav-links ${menuOpen ? 'open' : ''}` },
          NAV_LINKS.map(link =>
            createElement(
              'a',
              {
                key: link,
                href: '#',
                className: 'nav-link',
                onClick: () => setMenuOpen(false),
              },
              link,
            ),
          ),
          createElement('a', { href: '#', className: 'nav-cta' }, 'Start Learning \u2192'),
        ),
        createElement(
          'button',
          {
            className: 'hamburger',
            onClick: () => setMenuOpen(open => !open),
            'aria-label': 'Toggle menu',
          },
          createElement('span'),
          createElement('span'),
          createElement('span'),
        ),
      ),
    ),
    createElement(
      'section',
      { className: 'hero' },
      createElement('h1', { className: 'hero-title' }, 'A resource for learning FRC robot programming'),
      createElement(
        'div',
        { className: 'hero-actions' },
        createElement('a', { href: '#', className: 'btn-primary' }, 'Get Started Free'),
        createElement(
          'a',
          { href: '#', className: 'btn-ghost' },
          createElement(
            'svg',
            {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              'aria-hidden': true,
            },
            createElement('path', {
              d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
            }),
          ),
          'View on GitHub',
        ),
      ),
    ),
    createElement(
      'section',
      { className: 'features-section' },
      createElement(
        'div',
        { className: 'section-header' },
        createElement('p', { className: 'section-eyebrow' }, "What you'll learn"),
        createElement(
          'h2',
          { className: 'section-title centered' },
          'Everything from intake to',
          createElement('br'),
          createElement('span', { className: 'accent-pink' }, 'autonomous routines'),
        ),
      ),
      createElement(
        'div',
        { className: 'features-grid' },
        FEATURES.map(feature =>
          createElement(
            'div',
            { key: feature.title, className: 'feature-card' },
            createElement(
              'div',
              { className: 'feature-top' },
              createElement('span', { className: 'feature-tag' }, feature.tag),
            ),
            createElement('h3', { className: 'feature-title' }, feature.title),
            createElement('p', { className: 'feature-desc' }, feature.desc),
          ),
        ),
      ),
    ),
    createElement(
      'footer',
      { className: 'footer' },
      createElement(
        'div',
        { className: 'footer-logo' },
        createElement('span', { className: 'logo-bracket' }, '<'),
        'FRC',
        createElement('span', { className: 'logo-accent' }, 'Dev'),
        createElement('span', { className: 'logo-bracket' }, '/>'),
      ),
      createElement(
        'p',
        { className: 'footer-copy' },
        'Built for FRC teams, by FRC alumni. Not affiliated with FIRST\u00ae.',
      ),
      createElement(
        'div',
        { className: 'footer-links' },
        createElement('a', { href: '#' }, 'Privacy'),
        createElement('a', { href: '#' }, 'Terms'),
        createElement('a', { href: '#' }, 'Contact'),
      ),
    ),
  )
}
