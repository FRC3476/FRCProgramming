import { useMemo } from 'react'
import { buildNavItems } from '../../utils/buildNavItems'
import { ScrollNav } from '../scrollnav/ScrollNav'
import { MarkdownContent } from '../MarkdownContent'
import introductionMd from '../../content/introduction.md?raw'

export function LandingPage() {
  const navItems = useMemo(() => buildNavItems(introductionMd), [])

  return (
    <>
      <ScrollNav items={navItems} />
      <main className="page">
        <section className="page-section">
          <MarkdownContent markdown={introductionMd} />
        </section>
      </main>
    </>
  )
}
