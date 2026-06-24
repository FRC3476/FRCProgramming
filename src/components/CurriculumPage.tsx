import { useEffect, useMemo } from 'react'
import { git } from '../data/git'
import { buildNavItems } from '../utils/buildNavItems'
import { ScrollNav } from './ScrollNav'
import { CurriculumContentBlocks } from './CurriculumContentBlocks'
import { introduction } from '../data/introduction'
import { first_subsystem } from '../data/first-subsystem'


import './CurriculumPage.css'

export function CurriculumPage() {
  const navItems = useMemo(
    () => [...buildNavItems(introduction), ...buildNavItems(git), ...buildNavItems(first_subsystem)],
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


      {/* Introduction section */}
      {introduction.map((section) => (
        <section key={section.id} id={section.id} className="curriculum-page">
          <h1>{section.title}</h1>
          {section.content && <CurriculumContentBlocks blocks={section.content} />}
          {section.subheadings?.map((sub) => (
            <div key={sub.id} id={sub.id}>
              <h2>{sub.title}</h2>
              {sub.content && <CurriculumContentBlocks blocks={sub.content} />}
            </div>
          ))}
          
        </section>
      ))}

      {/* Git section */}
      {git.map((section) => (
        <section key={section.id} id={section.id} className="curriculum-page">
          <h1>{section.title}</h1>
          {section.content && <CurriculumContentBlocks blocks={section.content} />}
          {section.subheadings?.map((sub) => (
            <div key={sub.id} id={sub.id}>
              <h2>{sub.title}</h2>
              {sub.content && <CurriculumContentBlocks blocks={sub.content} />}
            </div>
          ))}
        </section>
      ))}

      {/* First Subsystem section */}
      {first_subsystem.map((section) => (
        <section key={section.id} id={section.id} className="curriculum-page">
          <h1>{section.title}</h1>
          {section.subheadings?.map((sub) => (
            <div key={sub.id} id={sub.id}>
              <h2>{sub.title}</h2>
              {sub.content && <CurriculumContentBlocks blocks={sub.content} />}
            </div>
          ))}
        </section>
      ))}

      

      </main>
    </>
  )
}
