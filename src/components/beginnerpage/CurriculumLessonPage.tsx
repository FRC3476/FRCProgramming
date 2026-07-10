import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { buildNavItems } from '../../utils/buildNavItems'
import { ScrollNav } from '../scrollnav/ScrollNav'
import { MarkdownContent } from '../MarkdownContent'
import { curriculum } from '../../data/curriculum'

export function CurriculumLessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const entry = curriculum.find((item) => item.slug === slug)

  const navItems = useMemo(
    () => (entry ? buildNavItems(entry.markdown) : []),
    [entry],
  )

  if (!entry) {
    return <Navigate to="/beginner" replace />
  }

  return (
    <>
      <ScrollNav items={navItems} />
      <main className="page">
        <section className="page-section">
          <MarkdownContent markdown={entry.markdown} />
        </section>
      </main>
    </>
  )
}
