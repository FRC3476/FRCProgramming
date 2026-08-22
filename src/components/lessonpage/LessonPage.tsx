import { useLayoutEffect, useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getCurriculum } from '../../data/curriculum'
import { buildNavItems } from '../../utils/buildNavItems'
import { AdvanceNav } from '../advancenav/AdvanceNav'
import { MarkdownContent } from '../MarkdownContent'
import { ScrollNav } from '../scrollnav/ScrollNav'

export function LessonPage() {
  const { section, slug } = useParams<{ section: string; slug: string }>()
  const entries = section ? getCurriculum(section) : undefined
  const entry = entries?.find((item) => item.slug === slug)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [section, slug])

  const navItems = useMemo(
    () => (entry ? buildNavItems(entry.markdown) : []),
    [entry],
  )

  const lessons = useMemo(
    () =>
      (entries ?? []).map((item) => ({
        slug: item.slug,
        title: item.title,
        sections: buildNavItems(item.markdown).filter((nav) => nav.level === 1),
      })),
    [entries],
  )

  if (!section || !entries || !entry) {
    return <Navigate to={section ? `/${section}` : '/'} replace />
  }

  return (
    <ScrollNav
      items={navItems}
      lessons={lessons}
      section={section}
      currentSlug={entry.slug}
    >
      <main className="page">
        <section className="page-section">
          <MarkdownContent markdown={entry.markdown} />
          <AdvanceNav section={section} slug={entry.slug} entries={entries} />
        </section>
      </main>
    </ScrollNav>
  )
}
