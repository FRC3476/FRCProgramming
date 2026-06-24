import { useEffect, useMemo } from 'react'
import { git_curriculum } from '../data/git'
import { buildNavItems } from '../utils/buildNavItems'
import { ScrollNav } from './ScrollNav'
import './CurriculumPage.css'
import { introduction } from '../data/introduction'

export function CurriculumPage() {
  const navItems = useMemo(
    () => [...buildNavItems(introduction), ...buildNavItems(git_curriculum)],
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
      {introduction.map((section) => (
        <section key={section.id} id={section.id} className="curriculum-page">
          <h1>{section.title}</h1>
          {section.subheadings?.map((sub) => (
            <div key={sub.id} id={sub.id}>
              <h2>{sub.title}</h2>
            </div>
          ))}
          {section.content?.map((content, i) => (
            <p key={i}>{content.type === 'text' ? content.body : null}</p>
          ))}
        </section>
      ))}
      {git_curriculum.map((section) => (
        <section key={section.id} id={section.id} className="curriculum-page">
          <h1>{section.title}</h1>
          {section.subheadings?.map((sub) => (
            <div key={sub.id} id={sub.id}>
              <h2>{sub.title}</h2>
              {sub.content?.map((content, i) => (
                <p key={i}>{content.type === 'text' ? content.body : null}</p>
              ))}
            </div>
          ))}
        </section>
      ))}
      </main>
    </>
  )
}
