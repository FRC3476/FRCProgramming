import { useMemo } from 'react'
import { buildNavItems } from '../../utils/buildNavItems'
import { ScrollNav } from '../scrollnav/ScrollNav'
import { MarkdownContent } from '../MarkdownContent'
import { curriculum } from '../../data/curriculum'

export function CurriculumPage() {
  const navItems = useMemo(
    () => curriculum.flatMap((entry) => buildNavItems(entry.markdown)),
    [],
  )

  return (
    <>
      <ScrollNav items={navItems} />
      <main className="page">
        {curriculum.map(({ slug, markdown }) => (
          <section key={slug} className="page-section">
            <MarkdownContent markdown={markdown} />
          </section>
        ))}
      </main>
    </>
  )
}
