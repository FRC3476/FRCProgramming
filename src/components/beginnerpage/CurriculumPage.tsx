import { useMemo } from 'react'
import { buildNavItems } from '../../utils/buildNavItems'
import { ScrollNav } from '../ScrollNav'
import { MarkdownContent } from '../MarkdownContent'
import { curriculum } from '../../data/curriculum'
import './CurriculumPage.css'

export function CurriculumPage() {
  const navItems = useMemo(
    () => curriculum.flatMap((entry) => buildNavItems(entry.markdown)),
    [],
  )

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
