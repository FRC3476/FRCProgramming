import { useMemo } from 'react'
import { buildNavItems } from '../../utils/buildNavItems'
import { ScrollNav } from '../ScrollNav'
import { MarkdownContent } from '../MarkdownContent'
import introductionMd from '../../content/introduction.md?raw'
import '../beginnerpage/CurriculumPage.css'
import './LandingPage.css'

export function LandingPage() {
  const navItems = useMemo(() => buildNavItems(introductionMd), [])

  return (
    <>
      <ScrollNav items={navItems} />
      <main className="curriculum">
        <section className="curriculum-page landing-page">
          <MarkdownContent markdown={introductionMd} />
        </section>
      </main>
    </>
  )
}
