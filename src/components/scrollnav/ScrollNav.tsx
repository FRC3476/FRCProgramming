import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Link, NavLink } from 'react-router-dom'
import type { NavItem } from '../../utils/buildNavItems'
import { SCROLL_NAV_ID, useSidebarNav } from './sidebarNavContext'
import { ScrollNavBackLink } from './ScrollNavBackLink'
import './ScrollNav.css'

export type LessonNavEntry = {
  slug: string
  title: string
  sections: NavItem[]
}

type ScrollNavProps = {
  items: NavItem[]
  children: ReactNode
  lessons?: LessonNavEntry[]
  section?: string
  currentSlug?: string
}

const ACTIVE_OFFSET_RATIO = 0.4
const SCROLL_END_DEBOUNCE_MS = 100
const SIDEBAR_DOCK_QUERY = '(min-width: 960px)'

function getActiveLine(): number {
  return window.innerHeight * ACTIVE_OFFSET_RATIO
}

function stepActiveIndex(
  items: NavItem[],
  activeIndex: number,
  scrollingDown: boolean,
): number {
  const line = getActiveLine()

  if (scrollingDown) {
    const next = items[activeIndex + 1]
    if (!next) return activeIndex
    const top = document.getElementById(next.id)?.getBoundingClientRect().top
    if (top !== undefined && top <= line) {
      return activeIndex + 1
    }
    return activeIndex
  }

  const current = items[activeIndex]
  if (!current || activeIndex === 0) return activeIndex
  const top = document.getElementById(current.id)?.getBoundingClientRect().top
  if (top !== undefined && top > line) {
    return activeIndex - 1
  }
  return activeIndex
}

function indexFromId(items: NavItem[], id: string): number {
  const index = items.findIndex((item) => item.id === id)
  return index >= 0 ? index : 0
}

export function ScrollNav({
  items,
  children,
  lessons,
  section,
  currentSlug,
}: ScrollNavProps) {
  const { overlayOpen, setOverlayOpen, registerSidebar } = useSidebarNav()
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')
  const [docked, setDocked] = useState(true)
  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(
    () => (currentSlug ? new Set([currentSlug]) : new Set()),
  )
  const activeIndexRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const previousSlugRef = useRef(currentSlug)

  const setActive = useCallback(
    (id: string) => {
      activeIndexRef.current = indexFromId(items, id)
      setActiveId(id)
    },
    [items],
  )

  const scrollToItem = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
      history.replaceState(null, '', `#${id}`)
      setOverlayOpen(false)
    },
    [setActive, setOverlayOpen],
  )

  const toggleExpanded = useCallback((slug: string) => {
    setExpandedSlugs((current) => {
      const next = new Set(current)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }, [])

  useEffect(() => {
    if (!currentSlug) return

    const previousSlug = previousSlugRef.current
    previousSlugRef.current = currentSlug

    setExpandedSlugs((current) => {
      if (current.has(currentSlug) && previousSlug === currentSlug) {
        return current
      }
      const next = new Set(current)
      if (previousSlug && previousSlug !== currentSlug) {
        next.delete(previousSlug)
      }
      next.add(currentSlug)
      return next
    })
  }, [currentSlug])

  useLayoutEffect(() => registerSidebar(), [registerSidebar])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && items.some((item) => item.id === hash)) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' })
        setActive(hash)
      })
    }
  }, [items, setActive])

  useEffect(() => {
    if (items.length === 0) return

    const currentId = items[activeIndexRef.current]?.id
    activeIndexRef.current = currentId ? indexFromId(items, currentId) : 0
    lastScrollYRef.current = window.scrollY

    let timeoutId: ReturnType<typeof setTimeout>

    const settle = () => {
      const id = items[activeIndexRef.current]?.id
      if (id) setActiveId(id)
    }

    const onScroll = () => {
      const scrollY = window.scrollY
      const scrollingDown = scrollY > lastScrollYRef.current
      const scrollingUp = scrollY < lastScrollYRef.current
      lastScrollYRef.current = scrollY

      if (scrollingDown || scrollingUp) {
        activeIndexRef.current = stepActiveIndex(
          items,
          activeIndexRef.current,
          scrollingDown,
        )
      }

      clearTimeout(timeoutId)
      timeoutId = setTimeout(settle, SCROLL_END_DEBOUNCE_MS)
    }

    const onScrollEnd = () => {
      clearTimeout(timeoutId)
      settle()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scrollend', onScrollEnd, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', onScrollEnd)
    }
  }, [items])

  useLayoutEffect(() => {
    const media = window.matchMedia(SIDEBAR_DOCK_QUERY)
    const sync = () => {
      setDocked(media.matches)
      if (media.matches) setOverlayOpen(false)
    }

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [setOverlayOpen])

  useEffect(() => {
    if (!overlayOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOverlayOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [overlayOpen, setOverlayOpen])

  const currentLessonExpanded = currentSlug ? expandedSlugs.has(currentSlug) : false
  const activeItem = items.find((item) => item.id === activeId)
  const subtitleActive = currentLessonExpanded && activeItem?.level === 1
  const curriculumMode = Boolean(lessons && section)

  return (
    <div className={`page-shell${overlayOpen ? ' is-overlay-open' : ''}`}>
      <aside
        className={`scroll-nav-container${overlayOpen ? ' is-open' : ''}`}
        aria-hidden={!(docked || overlayOpen)}
        inert={!(docked || overlayOpen)}
      >
        <ScrollNavBackLink />
        <nav
          id={SCROLL_NAV_ID}
          className="scroll-nav"
          aria-label={curriculumMode ? 'Lessons' : 'Page sections'}
        >
          {curriculumMode && lessons && section ? (
            <ul className="scroll-nav__list">
              {lessons.map((lesson) => {
                const expanded = expandedSlugs.has(lesson.slug)
                const isCurrent = lesson.slug === currentSlug
                const subListId = `scroll-nav-subs-${lesson.slug}`

                return (
                  <li key={lesson.slug} className="scroll-nav__lesson">
                    <div className="scroll-nav__lesson-row">
                      {lesson.sections.length > 0 ? (
                        <button
                          type="button"
                          className="scroll-nav__expand"
                          aria-expanded={expanded}
                          aria-controls={subListId}
                          aria-label={
                            expanded
                              ? `Hide sections in ${lesson.title}`
                              : `Show sections in ${lesson.title}`
                          }
                          onClick={() => toggleExpanded(lesson.slug)}
                        />
                      ) : (
                        <span className="scroll-nav__expand-spacer" />
                      )}
                      <NavLink
                        to={`/${section}/${lesson.slug}`}
                        end
                        className={({ isActive }) =>
                          `scroll-nav__button scroll-nav__lesson-link${
                            isActive && !subtitleActive ? ' is-active' : ''
                          }`
                        }
                        onClick={() => setOverlayOpen(false)}
                      >
                        <span className="scroll-nav__label">{lesson.title}</span>
                      </NavLink>
                    </div>
                    {expanded ? (
                      <ul id={subListId} className="scroll-nav__sublist">
                        {lesson.sections.map((item) => (
                          <li
                            key={item.id}
                            className="scroll-nav__item scroll-nav__item--sub"
                          >
                            {isCurrent ? (
                              <button
                                type="button"
                                className={`scroll-nav__button${
                                  activeId === item.id ? ' is-active' : ''
                                }`}
                                aria-current={
                                  activeId === item.id ? 'true' : undefined
                                }
                                onClick={() => scrollToItem(item.id)}
                              >
                                <span className="scroll-nav__label">{item.title}</span>
                              </button>
                            ) : (
                              <Link
                                to={`/${section}/${lesson.slug}#${item.id}`}
                                className="scroll-nav__button"
                                onClick={() => setOverlayOpen(false)}
                              >
                                <span className="scroll-nav__label">{item.title}</span>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          ) : (
            <ul className="scroll-nav__list">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`scroll-nav__item${item.level === 1 ? ' scroll-nav__item--sub' : ''}`}
                >
                  <button
                    type="button"
                    className={`scroll-nav__button${activeId === item.id ? ' is-active' : ''}`}
                    aria-current={activeId === item.id ? 'true' : undefined}
                    onClick={() => scrollToItem(item.id)}
                  >
                    <span className="scroll-nav__label">{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </aside>
      {overlayOpen ? (
        <button
          type="button"
          className="scroll-nav-backdrop"
          aria-label="Close section navigation"
          onClick={() => setOverlayOpen(false)}
        />
      ) : null}
      {children}
    </div>
  )
}
