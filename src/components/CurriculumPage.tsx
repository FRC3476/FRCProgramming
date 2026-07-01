import { useEffect, useMemo } from 'react'
import { buildNavItems } from '../utils/buildNavItems'
import { ScrollNav } from './ScrollNav'
import { MarkdownContent } from './MarkdownContent'
import { curriculum } from '../data/curriculum'
import './CurriculumPage.css'

export function CurriculumPage() {
  const navItems = useMemo(
    () => curriculum.flatMap((entry) => buildNavItems(entry.markdown)),
    [],
  )

  useEffect(() => {
    const intro = document.getElementById('introduction')
    if (!intro) return

    const clampScroll = () => {
      const maxScroll = intro.offsetTop
      if (window.scrollY < maxScroll) {
        window.scrollTo(0, maxScroll)
      }
    }

    clampScroll()
    window.addEventListener('scroll', clampScroll, { passive: true })
    return () => window.removeEventListener('scroll', clampScroll)
  }, [])

  return (
    <>
      <ScrollNav items={navItems} />
      <main className="curriculum">
        {curriculum.map(({ slug, markdown }) => (
          <section key={slug} className="curriculum-page">
            <MarkdownContent markdown={markdown} />
          </section>
        ))}
      </main>
    </>
  )
}
